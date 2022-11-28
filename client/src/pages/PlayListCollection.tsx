import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getBookmarkList, getFollowList, getUserInfo } from '../api/userApi';
import CplayList from '../components/playlistcollection/CplayList';
import { myValue } from '../slices/mySlice';
import { PlaylistInfoType } from './PlaylistList';
import { H2, RankingListStyle } from './RankingList';

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
				}
			});
		}
		if (Number(id) === 2) {
			setTitle('북마크한 플레이리스트');
			getBookmarkList(Number(userId)).then((res) => {
				if (res.data) {
					setPlayLists(res.data);
				}
			});
		}
		if (Number(id) === 3) {
			setTitle('팔로우 한 DJ');
			getFollowList(Number(userId)).then((res) => setFollowList(res.data));
		}
	}, []);

	const props = {
		setPlayLists,
		id: Number(id),
		userId: Number(userId),
		memberId: myId,
	};

	return (
		<RankingListStyle>
			<H2 className="title">{title}</H2>
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
		</RankingListStyle>
	);
};

export default UserPlayList;

const PlayListsWrapper = styled.div`
	width: 100%;
	max-width: 700px;
	box-shadow: 0 0 10px #00000013;
	border-radius: 10px;
	overflow-y: scroll;

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
		border-radius: 10px;
	}
	::-webkit-scrollbar-track {
		background-color: ${(props) => props.theme.colors.gray300};
		border-radius: 10px;
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
