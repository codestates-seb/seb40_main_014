import styled from 'styled-components';
import { PlayListInfoProps } from '../../pages/PlayListDetail';
import Category from '../common/Category';
import { FaHeart } from 'react-icons/fa';
import BookMark from '../common/BookMark';

const PlayListInfo = ({ playListInfo }: PlayListInfoProps) => {
	return (
		<PlayListInfoStyle>
			<div className="info">
				<AlbumImage>
					<img
						src="https://t1.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/0_JTh3JET7ZCHaT_IJhG4VbhEpI.png"
						alt="플레이리스트 이미지"
					/>
				</AlbumImage>
				<Info>
					<div className="title">
						{playListInfo.title}
						<Category category={playListInfo.category}>
							{playListInfo.category}
						</Category>
					</div>
					<div className="options">
						<div className="author">
							<img
								src="https://t1.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/0_JTh3JET7ZCHaT_IJhG4VbhEpI.png"
								alt="{playListInfo.author}"
							/>
							{playListInfo.author}
						</div>
						<div>
							<FaHeart color="red" size="24" />
							{playListInfo.like}
						</div>
						<div>
							<BookMark />
						</div>
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
	}
	.total {
		font-size: ${(props) => props.theme.fontSize.medium};
		color: ${(props) => props.theme.colors.purple};
		margin-top: 10px;
		margin-bottom: 10px;
	}
`;
const AlbumImage = styled.div`
	flex: 4;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		max-width: 300px;
		max-height: 300px;
	}
`;
const Info = styled.div`
	padding-left: 30px;
	flex: 6;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	div {
		font-size: ${(props) => props.theme.fontSize.medium};
	}
	.title {
	}
	.options {
		display: flex;
		align-items: center;

		div {
			margin-right: 20px;
		}
		.author {
			img {
				margin: 0 5px;
				max-width: 30px;
				max-height: 30px;
			}
		}
	}
`;
