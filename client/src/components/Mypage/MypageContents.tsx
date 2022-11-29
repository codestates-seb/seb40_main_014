import styled from 'styled-components';
import Content from './Content';
import { useNavigate, useParams } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import { SwiperStyle } from '../../pages/RoomList';
import { useSelector } from 'react-redux';
import { myValue } from '../../slices/mySlice';

type MypageContentsType = {
	title?: string;
	contents?: Array<PlaylistInfoType>;
	id: number;
};

const MypageContents = ({ id, title, contents }: MypageContentsType) => {
	const navigate = useNavigate();
	const { userId } = useParams();

	const myId = useSelector(myValue).memberId;

	//* Swiper
	const settings = {
		modules: [Pagination, Navigation],
		slidesPerView: 2,
		spaceBetween: 1,
		navigation: true,
		pagination: { clickable: true },
		breakpoints: {
			641: {
				slidesPerView: 3,
				spaceBetween: 19,
			},
			981: {
				slidesPerView: 3,
				spaceBetween: 44,
			},
		},
	};

	return (
		<MypageContentsStyle>
			<Roof>
				<div className="title">{title}</div>
				{id === 1 ? (
					<div className="button-wrapper">
						{Number(userId) === myId && (
							<>
								<button
									className="create-btn"
									onClick={() => navigate('/makeplaylist/create')}>
									플리 만들기
								</button>
							</>
						)}
						<button
							onClick={() => navigate(`/playlistcollection/${id}/${userId}`)}>
							전체보기
						</button>
					</div>
				) : (
					<button
						onClick={() => navigate(`/playlistcollection/${id}/${userId}`)}>
						전체보기
					</button>
				)}
			</Roof>
			<Body>
				{contents.length > 2 ? (
					<MyPageSwiperStyle {...settings}>
						{contents.map((ele, idx) => {
							return (
								<SwiperSlide key={idx}>
									{id === 3 ? (
										<Content id={id} followlist={ele} />
									) : (
										<Content id={id} playlist={ele} />
									)}
								</SwiperSlide>
							);
						})}
					</MyPageSwiperStyle>
				) : (
					<NoSwiperStyle>
						{contents.map((ele, idx) => (
							<div key={idx}>
								{id === 3 ? (
									<Content id={id} followlist={ele} />
								) : (
									<Content id={id} playlist={ele} />
								)}
							</div>
						))}
					</NoSwiperStyle>
				)}
			</Body>
		</MypageContentsStyle>
	);
};

export default MypageContents;

const NoSwiperStyle = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 100%;
`;

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
			background-color: #f1eaff;
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
		.button-wrapper {
			display: flex;
			flex-direction: column;
		}
		button {
			margin-left: 10px;
			font-size: 12px;
		}
		.create-btn {
			margin-bottom: 5px;
		}
	}
`;

const Body = styled.div`
	margin-bottom: 60px;
	padding: 40px 60px;
	border-bottom-left-radius: ${(props) => props.theme.radius.largeRadius};
	border-bottom-right-radius: ${(props) => props.theme.radius.largeRadius};
	background-color: ${(props) => props.theme.colors.white};
	display: flex;
	overflow-x: auto;
	overflow-y: hidden;

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
