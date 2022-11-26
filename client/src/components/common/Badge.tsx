import styled from 'styled-components';
import { IoMdHeart } from 'react-icons/io';

type BadgeProps = {
	margin?: string;
	height?: string;
	children?: any;
	grade?: string;
};

const Badge = (props: BadgeProps) => {
	return (
		<BadgeStyle {...props}>
			{props.grade === 'LUVIP' ? (
				<IoMdHeart className="icon" />
			) : (
				<div className="circle"></div>
			)}
			{props.grade}
		</BadgeStyle>
	);
};

export default Badge;

const BadgeStyle = styled.div<BadgeProps>`
	display: flex;
	align-items: center;
	margin: ${(props) => props.margin && props.margin};
	font-size: ${(props) => props.theme.fontSize.small};
	color: ${(props) =>
		props.grade === 'silver'
			? props.theme.colors.gray600
			: props.grade === 'GOLD'
			? '#fab005'
			: props.grade === 'VIP'
			? props.theme.colors.purple
			: props.grade === 'LUVIP'
			? props.theme.colors.pink
			: props.theme.colors.black};

	.icon,
	.circle {
		margin-right: 6px;
	}

	.icon {
		font-size: 17px;
	}

	.circle {
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background-color: ${(props) =>
			props.grade === 'silver'
				? props.theme.colors.gray600
				: props.grade === 'GOLD'
				? '#fab005'
				: props.grade === 'VIP'
				? props.theme.colors.purple
				: props.grade === 'LUVIP'
				? props.theme.colors.pink
				: props.theme.colors.black};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.xSmall};

		.circle {
			width: 11px;
			height: 11px;
		}
	}
`;
