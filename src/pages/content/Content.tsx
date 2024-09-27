import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Content.scss';

gsap.registerPlugin(ScrollTrigger);

const Content = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const firstRef = useRef<HTMLHeadingElement | null>(null);
  const secondRef = useRef<HTMLHeadingElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const first = firstRef.current;
    const second = secondRef.current;
    const section = sectionRef.current;
    const content = contentRef.current;

    gsap.to(content, {
      scrollTrigger: {
        trigger: section,
        markers: true,
        start: 'top center',
        end: 'center bottom',
        scrub: 2,
      },
      y: '-600px',
      duration: 0.2,
    });
    gsap.to(first, {
      scrollTrigger: {
        trigger: section,
        markers: true,
        start: 'top center',
        end: 'center bottom',
        scrub: 2,
      },
      left: '49.8%',
      top: '-520px',
      duration: 0.2,
    });
    gsap.to(second, {
      scrollTrigger: {
        trigger: section,
        markers: true,
        start: 'top center',
        end: 'center bottom',
        scrub: 2,
      },
      right: '-7%',
      top: '-155px',
      duration: 0.2,
    });
  }, []);

  useEffect(() => {
    const chars = document.querySelectorAll('.char');
    const image = imageRef.current;

    const checkOverlap = () => {
      const imageRect = image!.getBoundingClientRect();

      chars.forEach((char) => {
        const charRect = char.getBoundingClientRect();
        const isOverlapping =
          charRect.left < imageRect.right &&
          charRect.right > imageRect.left &&
          charRect.top < imageRect.bottom &&
          charRect.bottom > imageRect.top;

        if (isOverlapping) {
          gsap.to(char, { color: 'black', duration: 0.2 });
        } else {
          gsap.to(char, { color: 'white', duration: 0.2 });
        }
      });
    };

    ScrollTrigger.create({
      trigger: '.scroller',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: checkOverlap,
    });
  }, []);

  return (
    <div className="scroller">
      <section ref={sectionRef} id="person-0">
        <div className="content-container" ref={contentRef}>
          <h4 ref={firstRef} className="first">
            {Array.from('Stanley').map((char, i) => (
              <span key={i} className="char">
                {char}
              </span>
            ))}
          </h4>
          <img
            ref={imageRef}
            className="image"
            width="560px"
            height="500px"
            src="/src/assets/content/stanley.jpg"
            alt="image"
          />
          <h4 ref={secondRef} className="second">
            {Array.from('Arinze').map((char, i) => (
              <span key={i} className="char">
                {char}
              </span>
            ))}
          </h4>
        </div>
      </section>
    </div>
  );
};

export default Content;
