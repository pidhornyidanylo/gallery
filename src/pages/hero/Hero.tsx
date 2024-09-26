import React from 'react';
import Header from '../../components/header/Header';
import ScrollDownIcon from '../../components/scrollDownIcon/ScrollDownIcon';
import heroTitle from '../../assets/hero/Hyperrealism.svg';

const Hero: React.FC = () => {
  return (
    <>
      <Header />
      <div className="hero-banner"></div>
      <img src={heroTitle} width="100%" alt="hero-title" />
      <ScrollDownIcon />
    </>
  );
};

export default Hero;
