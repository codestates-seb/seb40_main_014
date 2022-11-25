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
import { PlaylistInfoType } from '../../pages/PlaylistList';
import { SwiperStyle } from '../../pages/RoomList';

type MypageContentsType = {
	title?: string;
	contents?: Array<PlaylistInfoType>;
	key?: number;
};

const MypageContents = ({ title, contents }: MypageContentsType) => {
	const navigate = useNavigate();
	const slidesPerView = contents.length < 3 ? contents.length : 3;

	//* Swiper
	const settings = {
		modules: [Pagination, Navigation],
		slidesPerView: 2,
		spaceBetween: 15,
		navigation: true,
		pagination: { clickable: true },
		breakpoints: {
			641: {
				slidesPerView: 3,
				spaceBetween: 25,
			},
			981: {
				slidesPerView: 3,
				spaceBetween: 51,
			},
		},
	};

	return (
		<MypageContentsStyle>
			<Roof>
				<div className="title">{title}</div>
				{title === '나의 플레이리스트' ? (
					<div>
						<button onClick={() => navigate('/makeplaylist/create')}>
							플리 만들기
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
				<MyPageSwiperStyle {...settings}>
					{contents.map((playlist) => {
						return (
							<SwiperSlide key={playlist.playlistId}>
								<Content playlist={playlist} />
							</SwiperSlide>
						);
					})}
				</MyPageSwiperStyle>
			</Body>
		</MypageContentsStyle>
	);
};

export default MypageContents;

const MypageContentsStyle = styled.div`
	box-shadow: 1px 1px 10px #4d0bd133;
`;
const Roof = styled.div`
	padding: 10px 20px;
	border-top-left-radius: ${(props) => props.theme.radius.largeRadius};
	border-top-right-radius: ${(props) => props.theme.radius.largeRadius};
	background-color: ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};
	display: flex;
	justify-content: space-between;
	align-items: center;

	button {
		padding: 3px 7px;
		margin-left: 12px;
		background-color: ${(props) => props.theme.colors.white};
		color: ${(props) => props.theme.colors.purple};
		border-radius: ${(props) => props.theme.radius.smallRadius};
		transition: 0.1s;

		:hover {
			background-color: #e8ddff;
		}
	}

	// Tablet
	@media screen and (max-width: 980px) {
		button {
			font-size: 14px;
		}
	}
	// Mobile
	@media screen and (max-width: 640px) {
		padding: 10px 15px;
		.title {
			font-size: 14px;
		}
		button {
			margin-left: 10px;
			font-size: 12px;
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
	padding: 40px 60px;

	// Tablet
	@media screen and (max-width: 980px) {
		padding: 40px 20px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		padding: 40px 15px;
		margin-bottom: 40px;
	}
`;

const MyPageSwiperStyle = styled(SwiperStyle)`
	margin-bottom: 0;
`;
