import styled from 'styled-components';

const WrapperStyle = styled.div`
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

function Wrapper({ children }) {
	return <WrapperStyle>{children}</WrapperStyle>;
}

export default Wrapper;
