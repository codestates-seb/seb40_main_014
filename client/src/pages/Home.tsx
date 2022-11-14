import Wrapper from '../components/common/Wrapper';
import Footer from '../components/home/Footer';
import Header from '../components/home/Header';

function Home() {
	return (
		<>
			<Header />
			<Wrapper>
				<div style={{ height: '500px' }}>방 리스트</div>
			</Wrapper>
			<Footer />
		</>
	);
}

export default Home;
