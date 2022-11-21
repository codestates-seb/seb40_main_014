import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deletePlayList } from '../../api/playlistApi';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import { DefaultBtn, DefaultButton } from '../common/Button';
import Category from '../common/Category';
type PlaylistType = {
	playList: PlaylistInfoType;
	key?: number;
};
const CplayList = ({ playList }: PlaylistType) => {
	const { playListId, title, categoryList, playlist } = playList;
	const navigate = useNavigate();

	const onClickDelete = () => {
		deletePlayList(playListId).then((res) => console.log(res));
	};
	return (
		<CplayListStyle>
			<div className="top">
				<DefaultButton
					onClick={() => navigate(`/makeplaylist/modify/${playListId}`)}>
					수정
				</DefaultButton>
				<Deletebutton onClick={onClickDelete}>삭제</Deletebutton>
			</div>
			<div className="bottom">
				<div className="left">
					<img src={playlist[0].thumbnail} alt="이미지" />
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

	.top {
		position: absolute;
		top: 7%;
		right: 3%;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		button {
			margin-left: 16px;
			@media (max-width: 800px) {
				height: 20px;
			}
		}
	}

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

const Deletebutton = styled(DefaultBtn)`
	font-size: 16px;
	background-color: #f93c5fe5;
	:hover {
		background: linear-gradient(0deg, #fa1a2de9 0%, #fa243ddf 100%);
	}
`;
