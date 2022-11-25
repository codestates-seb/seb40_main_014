import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import Category from '../common/Category';
import ModifyButton from './ModifyButton';
type PlaylistType = {
	playList: PlaylistInfoType;
	key?: number;
};
const CplayList = ({ playList }: PlaylistType) => {
	const { playlistId, title, categoryList, playlistItems } = playList;

	return (
		<CplayListStyle>
			<ModifyButton playlistId={playlistId} />
			<div className="bottom">
				<div className="left">
					<img src={playlistItems[0].thumbnail} alt="이미지" />
				</div>
				<div className="right">
					<div>
						{categoryList.map((el, idx) => (
							<Category category={el} margin="0 4px 0 0" key={idx}>
								{el}
							</Category>
						))}
					</div>
					<div className="pltitle">{title}</div>
				</div>
			</div>
		</CplayListStyle>
	);
};

export default CplayList;

const CplayListStyle = styled.div`
	padding: 30px;
	width: 100%;
	margin-bottom: 5%;
	background-color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	box-shadow: 1px 1px 10px #4d0bd133;
	position: relative;

	.bottom {
		display: flex;
		.left {
			flex: 4;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.right {
			flex: 6;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			font-size: ${(props) => props.theme.fontSize.large};

			.pltitle {
				font-size: ${(props) => props.theme.fontSize.large};
			}
			.desc {
				font-size: ${(props) => props.theme.fontSize.medium};
			}
		}
		div {
			margin: 10px;

			img {
				margin-right: 50px;
				width: 69%;
				object-fit: cover;
				border-radius: 50%;
			}
		}
	}
`;
