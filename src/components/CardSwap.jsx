import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = forwardRef(({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}, ref) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  // Configuración rápida y snappy para los clics en las flechas (respuesta inmediata)
  const manualConfig = {
    ease: 'power3.out',
    durDrop: 0.35,
    durMove: 0.35,
    durReturn: 0.35,
    promoteOverlap: 0.6,
    returnDelay: 0.1
  };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const swapRef = useRef(() => {});

  // Reinicia el temporizador del movimiento automático (tras un control manual)
  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => swapRef.current('next'), delay);
  };

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    // dir: 'next' (frente -> atrás) | 'prev' (atrás -> frente)
    // cfg: configuración de animación (elastic por defecto, o una rápida para clics)
    const swap = (dir = 'next', cfg = config) => {
      if (order.current.length < 2) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      if (dir === 'next') {
        const [front, ...rest] = order.current;
        const elFront = refs[front].current;

        tl.to(elFront, { y: '+=500', duration: cfg.durDrop, ease: cfg.ease });

        tl.addLabel('promote', `-=${cfg.durDrop * cfg.promoteOverlap}`);
        rest.forEach((idx, i) => {
          const el = refs[idx].current;
          const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
          tl.set(el, { zIndex: slot.zIndex }, 'promote');
          tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: cfg.durMove, ease: cfg.ease }, `promote+=${i * 0.15}`);
        });

        const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
        tl.addLabel('return', `promote+=${cfg.durMove * cfg.returnDelay}`);
        tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return');
        tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: cfg.durReturn, ease: cfg.ease }, 'return');
        tl.call(() => {
          order.current = [...rest, front];
        });
      } else {
        // prev: la card del fondo viaja al frente, las demás retroceden un slot
        const arr = order.current;
        const back = arr[arr.length - 1];
        const rest = arr.slice(0, arr.length - 1);
        const elBack = refs[back].current;

        gsap.set(elBack, { zIndex: refs.length + 1 });
        tl.to(elBack, { y: '+=500', duration: cfg.durDrop, ease: cfg.ease });

        tl.addLabel('shift', `-=${cfg.durDrop * cfg.promoteOverlap}`);
        rest.forEach((idx, i) => {
          const el = refs[idx].current;
          const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length);
          tl.set(el, { zIndex: slot.zIndex }, 'shift');
          tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: cfg.durMove, ease: cfg.ease }, `shift+=${i * 0.15}`);
        });

        const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);
        tl.addLabel('return', `shift+=${cfg.durMove * cfg.returnDelay}`);
        tl.call(() => gsap.set(elBack, { zIndex: frontSlot.zIndex }), undefined, 'return');
        tl.to(elBack, { x: frontSlot.x, y: frontSlot.y, z: frontSlot.z, duration: cfg.durReturn, ease: cfg.ease }, 'return');
        tl.call(() => {
          order.current = [back, ...rest];
        });
      }
    };

    swapRef.current = swap;
    swap('next');
    intervalRef.current = window.setInterval(() => swap('next'), delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(() => swap('next'), delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  // Controles manuales expuestos al padre (flechas)
  useImperativeHandle(
    ref,
    () => ({
      next: () => {
        tlRef.current?.kill();
        swapRef.current('next', manualConfig);
        resetInterval();
      },
      prev: () => {
        tlRef.current?.kill();
        swapRef.current('prev', manualConfig);
        resetInterval();
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay]
  );

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
});

CardSwap.displayName = 'CardSwap';

export default CardSwap;
