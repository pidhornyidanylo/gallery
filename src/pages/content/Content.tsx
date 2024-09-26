import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Content.scss';

gsap.registerPlugin(ScrollTrigger);

const Content = () => {
  useEffect(() => {
    gsap.to('.first', {
      scrollTrigger: {
        trigger: '#person-0',
        start: 'top top',
        end: 'center bottom',
        scrub: 1,
      },
      x: '382px',
      y: '-307px',
      duration: 0.2,
    });
    gsap.to('.second', {
      scrollTrigger: {
        trigger: '#person-0',
        start: 'top top',
        end: 'center center',
        scrub: 1,
      },
      y: '71px',
      x: '-434px',
      duration: 0.2,
    });
    gsap.to('.image', {
      scrollTrigger: {
        trigger: '#person-0',
        start: 'top top',
        end: 'center center',
        scrub: 1,
      },
      y: '-660px',
      x: '-220px',
      duration: 0.1,
    });
  }, []);
  const imageRef = useRef(null);

  useEffect(() => {
    const chars = document.querySelectorAll('.char');
    const image = imageRef.current;

    const checkOverlap = () => {
      // @ts-ignore
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
      <section id="person-0">
        <h4 className="first">
          {Array.from('Stanley').map((char, i) => (
            <span key={i} className="char">
              {char}
            </span>
          ))}
        </h4>
        <h4 className="second">
          {Array.from('Arinze').map((char, i) => (
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
      </section>
    </div>
  );
};

export default Content;
