import styled from 'styled-components';
import LogoImg from '../../assets/images/footer-logo.png';

function Footer() {
	return (
		<FooterStyle>
			<img src={LogoImg} alt="logo" /> 러플리 LUVPLI · 하리보 싱싱 · 40th Code
			States 임시임
		</FooterStyle>
	);
}

export default Footer;

const FooterStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px 0;
	background-color: ${(props) => props.theme.colors.headerBackground};
	color: ${(props) => props.theme.colors.gray400};
	font-size: ${(props) => props.theme.fontSize.small};

	img {
		width: 90px;
		margin-bottom: 30px;
		/* opacity: 0.9; */
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.xSmall};

		img {
			width: 70px;
			margin-bottom: 30px;
		}
	}
`;
