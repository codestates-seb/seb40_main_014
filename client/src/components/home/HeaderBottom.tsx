import styled from 'styled-components';

function HeaderBottom() {
	return <HeaderBottomStyle />;
}

export default HeaderBottom;

const HeaderBottomStyle = styled.div`
	height: 80px;
	// Tablet
	@media screen and (max-width: 980px) {
		height: 76px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		height: 73px;
	}
`;
