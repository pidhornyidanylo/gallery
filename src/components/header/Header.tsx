import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Header.scss';
import HeaderBurger from './headerBurger/HeaderBurger';

const Header = () => {
  const [showBurger, setShowBurger] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowBurger(window.innerWidth < 991);
      setShowBurgerMenu(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    gsap.from('.navigation-burger', {
      scale: 0.4,
      translateX: 100,
    });
    gsap.to('.navigation-burger', {
      scale: 1,
      duration: 0.4,
    });
  }, [showBurger]);

  return (
    <header>
      <div className="logo-container">
        <h3 className="header-logo">Gallery</h3>
        <p className="header-routes">
          Home {'>'} Artists {'>'} Hyperrealism
        </p>
      </div>
      <nav className="header-navigation">
        {!showBurger && (
          <ul className="navigation-list">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Exhibitions</a>
            </li>
            <li>
              <a href="#">Artists</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        )}
        {showBurger && (
          <HeaderBurger
            showBurgerMenu={showBurgerMenu}
            setShowBurgerMenu={setShowBurgerMenu}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
