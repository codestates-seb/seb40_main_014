import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../home/Footer';
import Header from '../home/Header';

const MainWrapper = styled.div`
	margin: 0 120px;
	padding: 40px 0;

	// Tablet
	@media screen and (max-width: 980px) {
		margin: 0 60px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		margin: 0 30px;
	}
`;

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
