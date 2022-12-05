import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { IoArrowUpOutline } from 'react-icons/io5';

const ScrollToTopButton = () => {
	const [showButton, setShowButton] = useState(false);

	const scrollToTop = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handleShowButton = () => {
		if (window.scrollY > 500) setShowButton(true);
		else setShowButton(false);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleShowButton);

		return () => {
			window.removeEventListener('scroll', handleShowButton);
		};
	}, []);

	return (
		showButton && (
			<ScrollToTopButtonStyle onClick={scrollToTop}>
				<IoArrowUpOutline />
			</ScrollToTopButtonStyle>
		)
	);
};

export default ScrollToTopButton;

const ScrollToTopButtonStyle = styled.button`
	position: fixed;
	right: 10vw;
	bottom: 80px;
	width: 50px;
	height: 50px;
	background-color: #00000069;
	color: ${(props) => props.theme.colors.white};
	font-size: ${(props) => props.theme.fontSize.large};
	border-radius: 50%;
	transition: 0.2s;

	:hover {
		opacity: 0.75;
	}

	// Tablet
	@media screen and (max-width: 980px) {
		right: 80px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		right: 40px;
	}
`;
