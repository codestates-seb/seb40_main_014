import styled from 'styled-components';
import { PlayListInfoProps } from '../../pages/PlayListDetail';
import Category from '../common/Category';
import BookMark from '../common/BookMark';
import { useSelector } from 'react-redux';
import { selectBookMarkList, selectLikeList } from '../../slices/mySlice';
import Like from '../common/Like';

const PlayListInfo = ({ playListInfo, setPlayListInfo }: PlayListInfoProps) => {
	const likeList = useSelector(selectLikeList);
	const bookMarkList = useSelector(selectBookMarkList);
	return (
		<PlayListInfoStyle>
			<div className="info">
				<Img>
					<img
						src={playListInfo.playlist[0].thumbnail}
						alt="플레이리스트 이미지"
					/>
				</Img>
				<Info>
					<div className="title">
						{playListInfo.title}
						<div className="categoryBox">
							{playListInfo.categoryList &&
								playListInfo.categoryList.map((ele, idx) => (
									<Category key={idx} category={ele} margin="0 10px 0 0">
										{ele}
									</Category>
								))}
						</div>
					</div>
					<div className="options">
						<img
							src="https://t1.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/0_JTh3JET7ZCHaT_IJhG4VbhEpI.png"
							alt={playListInfo.memberId}
						/>
						<div>{playListInfo.memberId}</div>
						<Like
							likeList={likeList}
							playListId={playListInfo.playListId}
							memberId={playListInfo.memberId}
							setPlayListInfo={setPlayListInfo}
						/>
						<div>{playListInfo.like}</div>
						<BookMark
							bookMarkList={bookMarkList}
							playListId={playListInfo.playListId}
							memberId={playListInfo.memberId}
						/>
					</div>
				</Info>
			</div>
			<div className="total">{playListInfo.playlist.length} 곡</div>
		</PlayListInfoStyle>
	);
};

export default PlayListInfo;

const PlayListInfoStyle = styled.div`
	display: flex;
	flex-direction: column;
	.info {
		display: flex;
		justify-content: center;
		@media (max-width: 850px) {
			flex-direction: column;
			align-items: center;
		}
	}
	.total {
		font-size: ${(props) => props.theme.fontSize.large};
		color: ${(props) => props.theme.colors.purple};
		margin-top: 20px;
		margin-bottom: 20px;
	}
`;
const Img = styled.span`
	img {
		width: 350px;
		object-fit: cover;
		@media (max-width: 850px) {
			margin-bottom: 10px;
		}
		@media (max-width: 550px) {
			width: 300px;
		}
	}
`;
const Info = styled.div`
	width: 500px;
	margin-left: 3%;
	@media (max-width: 850px) {
		width: 400px;
		margin-left: 0;

		div {
			margin-bottom: 10px;
		}
	}
	@media (max-width: 550px) {
		width: 300px;
	}
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	div {
		font-size: ${(props) => props.theme.fontSize.medium};
	}
	.title {
		font-size: ${(props) => props.theme.fontSize.large};
		line-height: 1.5;

		.categoryBox {
			margin-top: 10px;
		}
	}
	.options {
		display: flex;
		align-items: center;
		img {
			width: 25px;
			margin: 0 5px;
			border-radius: 50%;
			object-fit: cover;
		}
		div {
			margin-left: 5px;
			margin-right: 20px;
		}
	}
`;
