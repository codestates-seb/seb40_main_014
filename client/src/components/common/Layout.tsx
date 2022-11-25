import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../home/Footer';
import Header from '../home/Header';
import HeaderBottom from '../home/HeaderBottom';
import ScrollToTop from './ScrollToTop';

function Layout() {
	return (
		<>
			<Header />
			<HeaderBottom />
			<MainWrapper>
				<Outlet />
			</MainWrapper>
			<Footer />
			<ScrollToTop />
		</>
	);
}

export default Layout;

const MainWrapper = styled.div`
	margin: 60px 15vw;

	// Tablet
	@media screen and (max-width: 980px) {
		margin: 60px 80px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		margin: 60px 40px;
	}
`;
