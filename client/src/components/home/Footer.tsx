import styled from 'styled-components';
import LogoImg from '../../assets/images/footer-logo.png';

const FooterStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px 0;
	background-color: var(--header-background-color);
	color: var(--gray-400);

	img {
		width: 100px;
		margin-bottom: 30px;
	}
`;

function Footer() {
	return (
		<FooterStyle>
			<img src={LogoImg} alt="logo" /> 러플리 LUVPLI · 하리보 싱싱 · CODE STATES
			40th 임시임
		</FooterStyle>
	);
}

export default Footer;
