import styled from 'styled-components';

type CategoryProps = {
	margin?: string;
	height?: string;
	children?: any;
	category?: string;
};

const Category = (props: CategoryProps) => {
	return <CategoryStyle {...props} />;
};

export default Category;

const CategoryStyle = styled.button<CategoryProps>`
	padding: 0 4px;
	margin: ${(props) => (props.margin ? props.margin : `0 10px`)};
	font-size: ${(props) => props.theme.fontSize.xSmall};
	height: ${(props) => (props.height ? props.height : `20px`)};
	color: white;
	/* bgcolor 임시로 해놨습니다. */
	background-color: ${(props) =>
		props.category === '발라드'
			? props.theme.colors.orange
			: props.category === '힙합'
			? props.theme.colors.purple
			: props.category === 'OST'
			? props.theme.colors.pink
			: props.theme.colors.gray300};
	/* border-radius: ${(props) => props.theme.radius.smallRadius}; */
	border-radius: 3px;
`;
