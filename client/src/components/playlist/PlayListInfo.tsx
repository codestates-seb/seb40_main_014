import styled from 'styled-components';
import { PlayListInfoProps } from '../../pages/PlayListDetail';
import Category from '../common/Category';
import { FaHeart } from 'react-icons/fa';
import BookMark from '../common/BookMark';

const PlayListInfo = ({ playListInfo }: PlayListInfoProps) => {
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
						<FaHeart color="#f783ac" size="24" />
						<div>{playListInfo.like}</div>
						<BookMark />
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
	}
`;
const Info = styled.div`
	width: 500px;
	margin-left: 3%;
	padding-left: 30px;
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
