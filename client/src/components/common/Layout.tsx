import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../home/Footer';
import Header from '../home/Header';

function Layout() {
	return (
		<>
			<Header />
			<MainWrapper>
				<Outlet />
			</MainWrapper>
			<Footer />
		</>
	);
}

export default Layout;

const MainWrapper = styled.div`
	margin: 40px 300px;

	// Tablet
	@media screen and (max-width: 980px) {
		margin: 40px 70px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		margin: 40px;
	}
`;
