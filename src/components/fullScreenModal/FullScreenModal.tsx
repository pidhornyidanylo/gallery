import { Box } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import { gsap } from "gsap";
import type * as React from "react";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type SwiperCore from "swiper";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import modalClose from "/src/assets/content/modalClose.svg";
import "./FullScreenModal.scss";
import "swiper/css";

type LayoutModalDialogProps = {
	layout: boolean;
	setLayout: Dispatch<SetStateAction<boolean>>;
	setHideSection: Dispatch<SetStateAction<boolean>>;
	artistWorks: string[];
	artistName: string;
};

const FullScreenModal: React.FC<LayoutModalDialogProps> = ({
	setLayout,
	setHideSection,
	layout,
	artistName,
	artistWorks,
}: LayoutModalDialogProps) => {
	const [changeSlider, setChangeSlider] = useState(false);
	const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
	const [showName, setShowName] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 991) {
				setChangeSlider(true);
			} else {
				setChangeSlider(false);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (layout && swiperInstance) swiperInstance.slideTo(5, 500);
		setShowName(true);
	}, [layout, swiperInstance]);

	useEffect(() => {
		if (showName) {
			gsap.fromTo(
				".artist-name",
				{ opacity: 0, scale: 0.97 },
				{
					opacity: 1,
					scale: 1,
					duration: 1.4,
					ease: "power3.out",
				},
			);
		}
	});

	return (
		<>
			<Stack direction="row" spacing={1} sx={{ zIndex: 1 }}></Stack>
			<Modal
				open={layout}
				onClick={() => {
					setHideSection(false);
					setLayout(false);
				}}
				onClose={() => {
					setHideSection(false);
					setLayout(false);
				}}
			>
				<ModalDialog
					layout="fullscreen"
					sx={{
						height: "100vh",
						backgroundColor: "transparent",
						zIndex: 2,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<button
						className="modal-buttonClose"
						onClick={() => setLayout(false)}
					>
						<img src={modalClose} alt="modal-close" />
					</button>
					<Box
						className="images-container"
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							gap: "40px",
							justifyContent: "space-between",
						}}
					>
						{showName && <div className="artist-name">{artistName}</div>}
						<Swiper
							slidesPerView={changeSlider ? 1 : 4}
							spaceBetween={30}
							centeredSlides={true}
							loop={true}
							mousewheel={true}
							onSwiper={setSwiperInstance}
							modules={[Mousewheel]}
							className="mySwiper"
						>
							{artistWorks.map((aWork, index) => (
								<SwiperSlide key={aWork}>
									<img src={aWork} alt={"artworkimage" + index} />
								</SwiperSlide>
							))}
						</Swiper>
					</Box>
				</ModalDialog>
			</Modal>
		</>
	);
};

export default FullScreenModal;
