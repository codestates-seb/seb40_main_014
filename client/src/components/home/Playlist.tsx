import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import { HiHeart } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import Category from '../common/Category';
import {
	Categorys,
	Detail,
	Img,
	LinkRoom,
	Name,
	Onair,
	RoomStyle,
	SwiperTrueType,
	Thumbnail,
	Title,
} from './Room';
import { IoMdMusicalNote } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { myLogin } from '../../slices/mySlice';
import Swal from 'sweetalert2';

type PlaylistType = {
	playList: PlaylistInfoType;
	key?: number;
	swiper?: boolean;
};

const Playlist = ({ playList, swiper }: PlaylistType) => {
	const navigate = useNavigate();
	const isLogin = useSelector(myLogin);

	const {
		playlistId,
		title,
		categoryList,
		like,
		memberId,
		name,
		playlistItems,
	} = playList;

	const onClickLinkPlaylist = () => {
		if (!isLogin) {
			Swal.fire({
				icon: 'warning',
				text: '로그인 후 이동하실 수 있습니다.',
			});
		} else {
			navigate(`/playlistdetail/${playlistId}`);
		}
	};

	const onClickLinkName = () => {
		if (!isLogin) {
			Swal.fire({
				icon: 'warning',
				text: '로그인 후 이동하실 수 있습니다.',
			});
		} else {
			navigate(`/mypage/${memberId}`);
		}
	};

	return (
		<RoomStyle>
			<LinkRoom onClick={onClickLinkPlaylist}>
				<Thumbnail>
					<Img src={playlistItems[0].thumbnail} alt="썸네일" />
					<PlaylistCount swiper={swiper}>
						<IoMdMusicalNote />
						{playlistItems.length}
					</PlaylistCount>
				</Thumbnail>
				<Title swiper={swiper}>{title}</Title>
			</LinkRoom>
			<Name swiper={swiper} onClick={onClickLinkName}>
				{name}
			</Name>
			<Detail>
				<Categorys>
					{categoryList &&
						categoryList.map((el, idx) => (
							<Link
								key={idx}
								to={`/search?type1=playlist&type2=category&q=${el}`}>
								<Category category={el} margin="0 4px 0 0">
									{el}
								</Category>
							</Link>
						))}
				</Categorys>
				<Like swiper={swiper}>
					<HiHeart color="#f783ac" />
					{like}
				</Like>
			</Detail>
		</RoomStyle>
	);
};

export default Playlist;

const PlaylistCount = styled(Onair)`
	> *:first-of-type {
		margin-right: 4px;
	}
	display: flex;
	align-items: center;
	background-color: #37af37a0;
`;

const Like = styled.span<SwiperTrueType>`
	> *:first-of-type {
		margin-right: 4px;
		font-size: 17px;
	}
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.colors.gray600};

	// Tablet
	@media screen and (max-width: 980px) {
		> *:first-of-type {
			margin-right: 4px;
			font-size: ${(props) => props.swiper && '15px'};
		}
		font-size: ${(props) => props.swiper && '14px'};
		display: ${(props) => (props.swiper ? 'none' : 'block')};
	}
	// Mobile
	@media screen and (max-width: 640px) {
		display: ${(props) => (props.swiper ? 'none' : 'block')};
		font-size: ${(props) => props.theme.fontSize.small};
	}
`;
