import { useCallback, useEffect, useRef, useState } from 'react';
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
import { IoIosArrowForward } from 'react-icons/io';

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

	//* 무한 스크롤
	const [hasNextPage, setHasNextPage] = useState(true);
	const currentPage = useRef<number>(1);
	const observerTargetEl = useRef<HTMLDivElement>(null);

	const fetch = useCallback(() => {
		if (type1 === 'room') {
			getSearchRooms(type2, q, currentPage.current, 9).then((res) => {
				console.log('search rooms res', res);

				if (res.data) {
					const data = res.data;
					const { page, totalPages } = res.pageInfo;
					setPosts((prevPosts) => [...prevPosts, ...data]);
					setHasNextPage(page !== totalPages);
					if (hasNextPage) currentPage.current += 1;
				}
			});
		}
		if (type1 === 'playlist') {
			getSearchPlaylists(type2, q, currentPage.current, 9).then((res) => {
				console.log('search playlists res', res);

				if (res.data) {
					const data = res.data;
					const { page, totalPages } = res.pageInfo;
					setPosts((prevPosts) => [...prevPosts, ...data]);
					setHasNextPage(page !== totalPages);
					if (hasNextPage) currentPage.current += 1;
				}
			});
		}
		if (type1 === 'user') {
			getSearchUsers(q, currentPage.current, 30).then((res) => {
				console.log('search users res', res);

				if (res.data) {
					const data = res.data;
					const { page, totalPages } = res.pageInfo;
					setPosts((prevPosts) => [...prevPosts, ...data]);
					setHasNextPage(page !== totalPages);
					if (hasNextPage) currentPage.current += 1;
				}
			});
		}
	}, []);

	useEffect(() => {
		if (!observerTargetEl.current || !hasNextPage) return;

		const io = new IntersectionObserver((entries, observer) => {
			if (entries[0].isIntersecting) fetch();
		});

		io.observe(observerTargetEl.current);

		return () => {
			io.disconnect();
		};
	}, [fetch, hasNextPage]);

	return (
		<MinHeightWrapper>
			<H2>
				{type1Title} <IoIosArrowForward /> {type2Title} <IoIosArrowForward />{' '}
				{q} 의 검색 결과
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
				</ListStyle>
			) : null}
			<div ref={observerTargetEl} />
		</MinHeightWrapper>
	);
};

export default Search;

const H2 = styled.h2`
	display: flex;
	align-items: center;
	margin-bottom: 60px;
	font-size: 20px;
	font-weight: 500;

	> svg {
		font-size: 18px;
		margin: 0 4px;
		color: ${(props) => props.theme.colors.gray800};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 18px;
		margin-bottom: 30px;
		> svg {
			font-size: 16px;
			margin: 0 2px;
		}
	}
`;
