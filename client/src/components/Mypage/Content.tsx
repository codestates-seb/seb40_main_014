import styled from 'styled-components';
import { musicInfoType } from '../../pages/MakePlayList';

type ContentType = {
	videoInfo?: any;
};

const Content = ({ videoInfo }: ContentType) => {
	return (
		<ContentStyle>
			<div className="imageBox">
				<img src={videoInfo.thumbnail} alt="이미지" />
			</div>
			<Name>{videoInfo.title}</Name>
		</ContentStyle>
	);
};

export default Content;

const ContentStyle = styled.div`
	.imageBox {
		padding: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 60%;
			object-fit: cover;
			border-radius: 50%;
		}
	}
`;
const Name = styled.div`
	margin-bottom: 20px;
	padding-bottom: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
