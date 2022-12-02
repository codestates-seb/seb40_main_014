import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { getBookmarkList, getFollowList, getUserInfo } from '../api/userApi';
import CplayList from '../components/playlistcollection/CplayList';
import { myLogin, myValue } from '../slices/mySlice';
import { PlaylistInfoType } from './PlaylistList';
import { H2, RankingListStyle } from './RankingList';

const UserPlayList = () => {
	const navigate = useNavigate();
	const { id, userId } = useParams();

	const [playlists, setPlayLists] = useState([]);
	const [followList, setFollowList] = useState([]);
	const [title, setTitle] = useState('');

	const myId = useSelector(myValue).memberId;
	const { name } = useSelector(myValue);
	const isLogin = useSelector(myLogin);

	useEffect(() => {
		if (!isLogin) {
			Swal.fire({
				icon: 'warning',
				text: '로그인 후 이동하실 수 있습니다.',
				confirmButtonText: '뒤로가기',
			}).then(() => {
				navigate(-1);
			});
		} else {
			if (Number(id) === 1) {
				getUserInfo(Number(userId))
					.then((res) => {
						setTitle(`${res.data.name}님의 플레이리스트`);
						setPlayLists(res.data.playlist.data);
					})
					.catch((err) => {
						console.log(err);
					});
			}
			if (Number(id) === 2) {
				setTitle('보관한 플레이리스트');
				getBookmarkList(Number(userId))
					.then((res) => {
						setPlayLists(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			}
			if (Number(id) === 3) {
				setTitle('팔로우 한 DJ');
				getFollowList(Number(userId))
					.then((res) => setFollowList(res.data))
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}, []);

	const props = {
		setPlayLists,
		id: Number(id),
		userId: Number(userId),
		memberId: myId,
		name,
	};

	return (
		<RankingListStyle>
			<H2 className="title">{title}</H2>
			{isLogin && (
				<PlayListsWrapper>
					{Number(id) === 3
						? followList &&
						  followList.map((ele) => {
								return (
									<CplayList key={ele.memberId} followList={ele} {...props} />
								);
						  })
						: playlists &&
						  playlists.map((playlist: PlaylistInfoType) => {
								return (
									<CplayList
										key={playlist.playlistId}
										playList={playlist}
										{...props}
									/>
								);
						  })}
				</PlayListsWrapper>
			)}
		</RankingListStyle>
	);
};

export default UserPlayList;

const PlayListsWrapper = styled.div`
	width: 100%;
	max-width: 700px;
	box-shadow: 0 0 10px #00000013;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	overflow-y: scroll;

	max-height: calc(100vh - 74px - 120px - 234px - 88px);
	// Tablet
	@media screen and (max-width: 980px) {
		max-height: calc(100vh - 72.406px - 120px - 234px - 88px);
	}
	// Mobile
	@media screen and (max-width: 640px) {
		max-height: calc(100vh - 72.406px - 80px - 212px - 84px);
	}

	// 스크롤바
	::-webkit-scrollbar {
		display: none;
	}
	::-webkit-scrollbar {
		display: block;
		width: 8px;
	}
	::-webkit-scrollbar-thumb {
		height: 30%;
		background-color: ${(props) => props.theme.colors.gray400};
		border-radius: ${(props) => props.theme.radius.largeRadius};
	}
	::-webkit-scrollbar-track {
		background-color: ${(props) => props.theme.colors.gray300};
		border-radius: ${(props) => props.theme.radius.largeRadius};
	}

	> div:first-of-type {
		border-radius: 10px 10px 0 0;
	}
	> div:not(:last-of-type) {
		border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
	}
	> div:last-of-type {
		border-radius: 0 0 10px 10px;
	}
`;
