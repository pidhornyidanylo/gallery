import React from 'react';
import Header from '../../components/header/Header';
import heroTitle from '../../assets/hero/Hyperrealism.svg';
import ActionIcon from '../../components/actionIcon/ActionIcon';

const Hero: React.FC = () => {
  return (
    <>
      <Header />
      <div className="hero-banner"></div>
      <img src={heroTitle} width="100%" alt="hero-title" />
      <ActionIcon
        text={' Scroll Down . Scroll Down . Scroll Down . Scroll Down .'}
        rotate={false}
      />
    </>
  );
};

export default Hero;
