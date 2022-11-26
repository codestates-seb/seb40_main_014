import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getBookmarkList, getFollowList, getUserInfo } from '../api/userApi';
import CplayList from '../components/playlistcollection/CplayList';
import { myValue } from '../slices/mySlice';
import { PlaylistInfoType } from './PlaylistList';

const UserPlayList = () => {
	const [playlists, setPlayLists] = useState([]);
	const [followList, setFollowList] = useState([]);
	const [title, setTitle] = useState('');

	const { id, userId } = useParams();
	const myId = useSelector(myValue).memberId;

	useEffect(() => {
		if (Number(id) === 1) {
			getUserInfo(Number(userId)).then((res) => {
				if (res.data) {
					setTitle(`${res.data.name}의 플레이리스트`);
					setPlayLists(res.data.playlist.data);
				} else {
					alert(res);
				}
			});
		}
		if (Number(id) === 2) {
			setTitle('북마크한 플레이리스트');
			getBookmarkList(Number(userId)).then((res) => {
				if (res.data) {
					setPlayLists(res.data);
				} else {
					alert(res);
				}
			});
		}
		if (Number(id) === 3) {
			setTitle('팔로우 한 DJ');
			getFollowList(Number(userId)).then((res) => setFollowList(res.data));
		}
	}, []);
	const props = {
		id: Number(id),
		userId: Number(userId),
		memberId: myId,
	};
	return (
		<UserPlayListStyle>
			<div className="title">{title}</div>
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
		</UserPlayListStyle>
	);
};

export default UserPlayList;

const UserPlayListStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.title {
		font-size: ${(props) => props.theme.fontSize.xLarge};
		font-weight: 600;
		margin-bottom: 60px;

		// Mobile
		@media screen and (max-width: 640px) {
			font-size: 24px;
		}
	}
`;

const PlayListsWrapper = styled.div`
	width: 100%;
	max-width: 700px;
	box-shadow: 0 0 10px #00000013;
	border-radius: 10px;

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
