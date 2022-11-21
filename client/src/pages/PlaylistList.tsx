import Playlist from '../components/home/Playlist';
import { useState, useEffect } from 'react';
import { DefaultButton } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { ButtonWrapper, H2, ListStyle } from './RoomList';
import { getPlaylists } from '../api/playlistApi';
import { useSelector } from 'react-redux';
import { myValue } from '../slices/mySlice';
import { musicInfoType } from './MakePlayList';

export type PlaylistInfoType = {
	memberId: string;
	title: string;
	playlist: Array<musicInfoType>;
	categoryList: Array<string>;
	status: boolean;
	like: number;
	playListId: number;
};

function PlaylistList() {
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(16);
	const [playlists, setPlayLists] = useState([]);

	const { memberId } = useSelector(myValue);

	useEffect(() => {
		getPlaylists(memberId, page, size).then((res) => {
			console.log('getPlaylists res', res);

			setPlayLists(res);
		});
	}, []);

	return (
		<>
			<ButtonWrapper>
				<Link to="/makeplaylist/create">
					<DefaultButton fontSize="16px" width="105px" height="42px">
						플리 만들기
					</DefaultButton>
				</Link>
			</ButtonWrapper>
			<H2>플레이리스트 Top 8</H2>
			<H2>최신 플레이리스트</H2>
			<ListStyle>
				{playlists.length
					? playlists.map((playlist: PlaylistInfoType) => (
							<Playlist playList={playlist} key={playlist.playListId} />
					  ))
					: null}
			</ListStyle>
		</>
	);
}

export default PlaylistList;
