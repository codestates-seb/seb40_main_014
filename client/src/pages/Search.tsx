import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	getSearchPlaylists,
	getSearchRooms,
	getSearchUsers,
} from '../api/searchApi';
import Playlist from '../components/home/Playlist';
import Room from '../components/home/Room';
import User from '../components/search/User';
import { PlaylistInfoType } from './PlaylistList';
import { ListStyle, MinHeightWrapper, RoomInfoType } from './RoomList';
import { MyInitialStateValue, myValue } from '../slices/mySlice';

const Search = () => {
	const params = new URLSearchParams(location.search);

	const type1 = params.get('type1');
	const type2 = params.get('type2');
	const q = params.get('q');

	const { memberId } = useSelector(myValue);

	const [posts, setPosts] = useState([]);

	const [type1Title, setType1Title] = useState(type1);
	const [type2Title, setType2Title] = useState(type2);

	useEffect(() => {
		if (type1 === 'room') {
			setType1Title('방');
			if (type2 === 'title') {
				setType2Title('방 제목');
			} else if (type2 === 'category') {
				setType2Title('방 장르');
			} else if (type2 === 'name') {
				setType2Title('방장명');
			}
		} else if (type1 === 'playlist') {
			setType1Title('플레이리스트');
			if (type2 === 'title') {
				setType2Title('플레이리스트 제목');
			} else if (type2 === 'category') {
				setType2Title('플레이리스트 장르');
			} else if (type2 === 'name') {
				setType2Title('작성자명');
			}
		} else if (type1 === 'user') {
			setType1Title('유저');
			if (type2 === 'name') {
				setType2Title('유저명');
			}
		}
	}, [type1, type2]);

	useEffect(() => {
		console.log('type1', type1, 'type2', type2, 'q', q);

		if (type1 === 'room') {
			getSearchRooms(type2, q).then((res) => {
				console.log('search rooms res', res);
				setPosts(res.data);
			});
		}
		if (type1 === 'playlist') {
			getSearchPlaylists(type2, q).then((res) => {
				console.log('search playlists res', res);
				setPosts(res.data);
			});
		}
		if (type1 === 'user') {
			getSearchUsers(q).then((res) => {
				console.log('search users res', res);
				setPosts(res.data);
			});
		}
	}, []);

	return (
		<MinHeightWrapper>
			<H2>
				{type1Title} &gt; {type2Title} &gt; {q} 의 검색 결과
			</H2>
			{posts.length ? (
				<ListStyle>
					{type1 === 'room' &&
						posts.map((room: RoomInfoType) => (
							<Room room={room} key={room.roomId} />
						))}
					{type1 === 'playlist' &&
						posts.map((playlist: PlaylistInfoType) => {
							// 본인이 쓴 글
							if (playlist.memberId === memberId) {
								return (
									<Playlist playList={playlist} key={playlist.playlistId} />
								);
							}
							//  남이 쓴 글
							else {
								// 비공개는 보여주지 않는다.
								if (playlist.status) {
									return (
										<Playlist playList={playlist} key={playlist.playlistId} />
									);
								}
							}
						})}
					{type1 === 'user' &&
						posts.map((user: MyInitialStateValue) => (
							<User user={user} key={user.memberId} />
						))}
					{/* <div ref={observerTargetEl} /> */}
				</ListStyle>
			) : null}
		</MinHeightWrapper>
	);
};

export default Search;

const H2 = styled.h2`
	margin-bottom: 60px;
	font-size: 20px;
	font-weight: 500;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 18px;
		margin-bottom: 30px;
	}
`;
