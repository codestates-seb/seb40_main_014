import styled from 'styled-components';
import { PlayListInfoProps } from '../../types/types';

const TitleDesc = ({ playListInfo }: PlayListInfoProps) => {
	return (
		<TitleDescStyle>
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
						{playListInfo.category}
					</div>
					<div className="options">{playListInfo.like}</div>
				</Info>
			</div>
			<div className="total">{playListInfo.total} 곡</div>
		</TitleDescStyle>
	);
};

export default TitleDesc;

const TitleDescStyle = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid orange;
	.info {
		display: flex;
	}
	.total {
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
	flex: 6;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	.title {
	}
	.options {
	}
`;
