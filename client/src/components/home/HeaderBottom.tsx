import styled from 'styled-components';

const HeaderBottom = () => {
	return <HeaderBottomStyle />;
};

export default HeaderBottom;

const HeaderBottomStyle = styled.div`
	height: 74px;
	// Tablet
	@media screen and (max-width: 980px) {
		height: 72.406px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		height: 72.406px;
	}
`;
