import styled from 'styled-components';
import { PlayListInfoProps } from '../../pages/PlayListDetail';
import Category from '../common/Category';
import { FaHeart } from 'react-icons/fa';
import BookMark from '../common/BookMark';

const PlayListInfo = ({ playListInfo }: PlayListInfoProps) => {
	return (
		<PlayListInfoStyle>
			<div className="info">
				<img
					src="https://t1.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/0_JTh3JET7ZCHaT_IJhG4VbhEpI.png"
					alt="플레이리스트 이미지"
				/>
				<Info>
					<div className="title">
						{playListInfo.title}
						<Category category={playListInfo.category}>
							{playListInfo.category}
						</Category>
					</div>
					<div className="options">
						<img
							src="https://t1.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/0_JTh3JET7ZCHaT_IJhG4VbhEpI.png"
							alt={playListInfo.author}
						/>
						<div>{playListInfo.author}</div>
						<FaHeart color="#f783ac" size="24" />
						<div>{playListInfo.like}</div>
						<BookMark />
					</div>
				</Info>
			</div>
			<div className="total">{playListInfo.total} 곡</div>
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

		img {
			width: 25%;
			object-fit: cover;
			margin-right: 10%;
		}
	}
	.total {
		font-size: ${(props) => props.theme.fontSize.large};
		color: ${(props) => props.theme.colors.purple};
		margin-top: 20px;
		margin-bottom: 20px;
	}
`;
const Info = styled.div`
	padding-left: 30px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	div {
		font-size: ${(props) => props.theme.fontSize.medium};
	}
	.title {
		font-size: ${(props) => props.theme.fontSize.large};
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
