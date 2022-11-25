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
	background-color: ${(props) =>
		props.category === '발라드'
			? '#74b816'
			: props.category === '댄스'
			? '#f03e3e'
			: props.category === '힙합'
			? '#f76707'
			: props.category === 'R&B'
			? '#1c7ed6'
			: props.category === '인디'
			? '#37b24d'
			: props.category === '록'
			? '#e64980'
			: props.category === '트로트'
			? '#f59f00'
			: props.category === 'POP'
			? '#7048e8'
			: props.category === 'OST'
			? '#ae3ec9'
			: props.theme.colors.gray300};
	border-radius: 3px;
`;
