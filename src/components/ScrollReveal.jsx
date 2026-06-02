import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  wordClassName = '',
  scrub = 2,
  stagger = 0.12,
  rotationEnd = 'center center',
  wordAnimationEnd = 'center center'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className={`word ${wordClassName}`.trim()} key={index}>
          {word}
        </span>
      );
    });
  }, [children, wordClassName]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const created = [];

    const tRotate = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=10%',
          end: rotationEnd,
          scrub
        }
      }
    );
    created.push(tRotate.scrollTrigger);

    const wordElements = el.querySelectorAll('.word');

    const tOpacity = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=10%',
          end: wordAnimationEnd,
          scrub
        }
      }
    );
    created.push(tOpacity.scrollTrigger);

    if (enableBlur) {
      const tBlur = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=10%',
            end: wordAnimationEnd,
            scrub
          }
        }
      );
      created.push(tBlur.scrollTrigger);
    }

    // Mata SOLO las animaciones de este título (no todas)
    return () => {
      created.forEach((st) => st && st.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, scrub, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`.trim()}>
      <span className={`scroll-reveal-text ${textClassName}`.trim()}>{splitText}</span>
    </h2>
  );
};

export default ScrollReveal;
