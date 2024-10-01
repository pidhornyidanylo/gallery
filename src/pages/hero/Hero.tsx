import type React from "react";
import heroTitle from "../../assets/hero/Hyperrealism.svg";
import ActionIcon from "../../components/actionIcon/ActionIcon";
import Header from "../../components/header/Header";
import "./Hero.scss";

const Hero: React.FC = () => {
	return (
		<>
			<Header />
			<div className="hero-banner" />
			<img src={heroTitle} width="100%" alt="hero-title" />
			<ActionIcon
				text={" Scroll Down . Scroll Down . Scroll Down . Scroll Down ."}
				rotate={false}
			/>
		</>
	);
};

export default Hero;
