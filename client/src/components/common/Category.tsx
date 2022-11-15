import styled from 'styled-components';

type CategoryProps = {
	height?: string;
	children?: any;
	category?: string;
};

const Category = (props: CategoryProps) => {
	return <CategoryStyle {...props} />;
};

export default Category;

const CategoryStyle = styled.button<CategoryProps>`
	margin: 0 10px;
	padding: 0 5px;
	font-size: ${(props) => props.theme.fontSize.xSmall};
	height: ${(props) => (props.height ? props.height : `20px`)};
	color: white;
	/* bgcolor 임시로 해놨습니다. */
	background-color: ${(props) =>
		props.category === 'Ballade'
			? props.theme.colors.orange
			: props.category === 'Hiphop'
			? props.theme.colors.purple
			: props.category === 'OST'
			? props.theme.colors.pink
			: props.theme.colors.gray300};
	border-radius: ${(props) => props.theme.radius.smallRadius};
`;
