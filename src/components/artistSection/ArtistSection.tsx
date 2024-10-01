import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import artIcon from "../../assets/content/images-svgrepo-com.svg";
import { debounce } from "../../utils/debounce";
import ActionIcon from "../actionIcon/ActionIcon";
import FullScreenModal from "../fullScreenModal/FullScreenModal";
import "./ArtistSection.scss";

export type ArtistSectionProps = {
	artistFirstName: string;
	artistSecondName: string;
	artistPhoto: string;
	artistWorks: string[];
};

gsap.registerPlugin(ScrollTrigger);

const ArtistSection: React.FC<ArtistSectionProps> = ({
	artistFirstName,
	artistSecondName,
	artistPhoto,
	artistWorks,
}: ArtistSectionProps) => {
	const [showArtWorksButton, setShowArtWorksButton] = useState(false);
	const [hideSection, setHideSection] = useState(false);
	const [firstNameBlackChars, setFirstNameBlackChars] = useState(0);
	const [secondNameBlackChars, setSecondNameBlackChars] = useState(0);
	const [layout, setLayout] = useState(false);

	const secondNamePositioningFluff = 2;
	const firstNamePositioningFluff = 4;

	const imageRef = useRef<HTMLImageElement | null>(null);
	const firstRef = useRef<HTMLHeadingElement | null>(null);
	const secondRef = useRef<HTMLHeadingElement | null>(null);
	const sectionRef = useRef<HTMLDivElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const image = imageRef.current;
		const handleResize = () => {
			if (image) {
				const imageRecLeft = image.getBoundingClientRect().left;
				const imageRecRight = image.getBoundingClientRect().right;
				gsap.to(firstRef.current, {
					left: imageRecLeft! + firstNameBlackChars,
				});
				gsap.to(secondRef.current, {
					right:
						imageRecRight! -
						image!.getBoundingClientRect().width +
						secondNameBlackChars -
						secondNamePositioningFluff,
				});
			}
		};
		window.addEventListener("scroll", debounce(handleResize, 500));
		window.addEventListener("resize", debounce(handleResize, 500));

		return () => {
			window.removeEventListener("resize", debounce(handleResize, 500));
			window.removeEventListener("scroll", debounce(handleResize, 1200));
		};
	});

	useEffect(() => {
		const charsOfFirstName = document.querySelectorAll(
			".char" + artistFirstName,
		);
		const image = imageRef.current;
		const checkOverlap = () => {
			if (!image) return;
			const imageRect = image.getBoundingClientRect();

			charsOfFirstName.forEach((char) => {
				const charRect = char.getBoundingClientRect();
				const isOverlapping =
					charRect.left < imageRect.right && charRect.right > imageRect.left;

				gsap.to(char, {
					color: isOverlapping ? "black" : "white",
					duration: 0.2,
				});
			});
		};
		const getFirstNameBlackCharsWidth = () => {
			let totalWidth = 0;
			for (
				let i = charsOfFirstName.length - 1;
				i >= Math.max(charsOfFirstName.length - 3, 0);
				i--
			) {
				const char = charsOfFirstName[i];
				if (char) {
					const charWidth = char.getBoundingClientRect().width;
					totalWidth += charWidth;
				}
			}

			setFirstNameBlackChars(totalWidth);
		};

		getFirstNameBlackCharsWidth();
		const scrollTrigger = ScrollTrigger.create({
			trigger: ".scroller",
			start: "top top",
			end: "bottom bottom",
			onUpdate: checkOverlap,
		});

		return () => {
			scrollTrigger.kill();
		};
	}, [artistFirstName]);

	useEffect(() => {
		const charsOfSecondName = document.querySelectorAll(
			".char" + artistSecondName,
		);
		const image = imageRef.current;
		const checkOverlap = () => {
			if (!image) return;
			const imageRect = image.getBoundingClientRect();

			charsOfSecondName.forEach((char) => {
				const charRect = char.getBoundingClientRect();
				const isOverlapping =
					charRect.left < imageRect.right && charRect.right > imageRect.left;

				gsap.to(char, {
					color: isOverlapping ? "black" : "white",
					duration: 0.2,
				});
			});
		};
		const getSecondNameBlackCharsWidth = () => {
			let totalWidth = 0;
			for (let i = 0; i < 3; i++) {
				const char = charsOfSecondName[i];
				if (char) {
					const charWidth = char.getBoundingClientRect().width;
					totalWidth += charWidth;
				}
			}

			setSecondNameBlackChars(totalWidth);
		};

		getSecondNameBlackCharsWidth();
		const scrollTrigger = ScrollTrigger.create({
			trigger: ".scroller",
			start: "top top",
			end: "bottom bottom",
			onUpdate: checkOverlap,
		});

		return () => {
			scrollTrigger.kill();
		};
	}, [artistSecondName]);

	useEffect(() => {
		const first = firstRef.current;
		const second = secondRef.current;
		const section = sectionRef.current;
		const content = contentRef.current;
		const image = imageRef.current;
		const imageRecLeft = image?.getBoundingClientRect().x;
		const imageRecRight = image?.getBoundingClientRect().right;

		const handleResize = () => {
			const yTrigger = window.innerWidth < 1400 ? "0px" : "-700px";
			gsap.to(content, {
				y: yTrigger,
				scrollTrigger: {
					trigger: section,
					start: "top center",
					end: "center bottom",
					scrub: 2,
				},
			});
			gsap.to(first, {
				left: imageRecLeft! + firstNameBlackChars - firstNamePositioningFluff,
				top: "-500px",
				scrollTrigger: {
					trigger: section,
					start: "top center",
					end: "center bottom",
					scrub: true,
				},
			});
			gsap.to(second, {
				right:
					imageRecRight! -
					image!.getBoundingClientRect().width +
					secondNameBlackChars -
					secondNamePositioningFluff,
				top: "-120px",
				scrollTrigger: {
					trigger: section,
					start: "top center",
					end: "center bottom",
					scrub: true,
				},
			});
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [firstNameBlackChars, secondNameBlackChars]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1400) {
				setShowArtWorksButton(true);
			} else {
				setShowArtWorksButton(false);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<section
			ref={sectionRef}
			id="person-section"
			className={hideSection ? "hide" : ""}
		>
			<div className="content-container" ref={contentRef}>
				{/* {showArtWorksButton && (
          <h5 className='artist-fullname'>{artistFirstName + ' ' + artistSecondName}</h5>
        )} */}
				<h4 ref={firstRef} className="first">
					{Array.from(artistFirstName).map((char, i) => (
						<span key={i} className={"char" + `${artistFirstName}`}>
							{char}
						</span>
					))}
				</h4>
				<h4 ref={secondRef} className="second">
					{Array.from(artistSecondName).map((char, i) => (
						<span key={i} className={"char" + `${artistSecondName}`}>
							{char}
						</span>
					))}
				</h4>
				<img
					ref={imageRef}
					className="image"
					width="560px"
					height="500px"
					src={artistPhoto}
					alt={"image" + `${artistFirstName}`}
				/>
				<ActionIcon
					text={"Artworks . View Artworks . View Artworks . View"}
					rotate={true}
					setLayout={setLayout}
					onClick={setHideSection}
				/>
				<div className="social-container">
					<img src="/src/assets/content/xIcon.svg" alt="x" />
					<img src="/src/assets/content/instaIcon.svg" alt="instagram" />
					<img src="/src/assets/content/fbIcon.svg" alt="facebook" />
					{showArtWorksButton && (
						<button
							className="artWorksButton"
							onClick={() => {
								setLayout(true);
								setHideSection(true);
							}}
						>
							<img src={artIcon} alt="art" />
						</button>
					)}
				</div>
			</div>
			<FullScreenModal
				setHideSection={setHideSection}
				artistName={artistFirstName + " " + artistSecondName}
				artistWorks={artistWorks}
				layout={layout}
				setLayout={setLayout}
			/>
		</section>
	);
};

export default ArtistSection;
