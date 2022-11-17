import styled from 'styled-components';

type ContentType = {
	name?: string;
};

const Content = ({ name }: ContentType) => {
	return (
		<ContentStyle>
			<div className="imageBox">
				<img
					src="https://t1.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/0_JTh3JET7ZCHaT_IJhG4VbhEpI.png"
					alt="이미지"
				/>
			</div>
			<Name>{name}</Name>
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
