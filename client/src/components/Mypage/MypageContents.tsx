import styled from 'styled-components';
import Content from './Content';
import { useNavigate } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type MypageContentsType = {
	title?: string;
	contents?: Array<string>;
};

const MypageContents = ({ title, contents }: MypageContentsType) => {
	const navigate = useNavigate();
	return (
		<MypageContentsStyle>
			<Roof>
				<div>{title}</div>
				{title === '나의 플레이리스트' ? (
					<div>
						<button onClick={() => navigate('/makeplaylist/create')}>
							플레이리스트 만들기
						</button>
						<button onClick={() => navigate('/playlistcollection')}>
							더보기
						</button>
					</div>
				) : (
					<button onClick={() => navigate('/playlistcollection')}>
						더보기
					</button>
				)}
			</Roof>
			<Body>
				<Swiper
					modules={[Pagination, Navigation]}
					slidesPerView={3}
					navigation
					pagination={{ clickable: true }}>
					{contents.map((ele) => {
						return (
							<SwiperSlide key={ele}>
								<Content name={ele} />
							</SwiperSlide>
						);
					})}
				</Swiper>
			</Body>
		</MypageContentsStyle>
	);
};

export default MypageContents;

const MypageContentsStyle = styled.div`
	box-shadow: 1px 1px 10px #4d0bd133;
`;
const Roof = styled.div`
	padding: 1% 2%;
	margin-top: 60px;
	border-top-left-radius: ${(props) => props.theme.radius.largeRadius};
	border-top-right-radius: ${(props) => props.theme.radius.largeRadius};
	background-color: ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};
	display: flex;
	justify-content: space-between;
	align-items: center;

	button {
		padding: 5px;
		margin-left: 10px;
		background-color: ${(props) => props.theme.colors.white};
		color: ${(props) => props.theme.colors.purple};
		border-radius: ${(props) => props.theme.radius.smallRadius};
		transition: 0.1s;

		:hover {
			background-color: #e8ddff;
		}
	}
`;

const Body = styled.div`
	margin-bottom: 60px;
	border-bottom-left-radius: ${(props) => props.theme.radius.largeRadius};
	border-bottom-right-radius: ${(props) => props.theme.radius.largeRadius};
	background-color: ${(props) => props.theme.colors.white};
	display: flex;
	overflow-x: auto;
	overflow-y: hidden;
	padding: 5% 10%;
`;
