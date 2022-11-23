import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { IoArrowUpOutline } from 'react-icons/io5';

const ScrollToTop = () => {
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
			<ScrollToTopStyle onClick={scrollToTop}>
				<IoArrowUpOutline />
			</ScrollToTopStyle>
		)
	);
};

export default ScrollToTop;

const ScrollToTopStyle = styled.button`
	position: fixed;
	right: 10vw;
	bottom: 80px;
	width: 50px;
	height: 50px;
	background-color: ${(props) => props.theme.colors.white};
	color: ${(props) => props.theme.colors.gray700};
	font-size: ${(props) => props.theme.fontSize.large};
	/* border: 2px solid ${(props) => props.theme.colors.gray700}; */
	box-shadow: 0px 0px 3px 1.5px ${(props) => props.theme.colors.gray700};
	border-radius: 50%;
	transition: 0.2s;

	:hover {
		background-color: ${(props) => props.theme.colors.gray50};
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
