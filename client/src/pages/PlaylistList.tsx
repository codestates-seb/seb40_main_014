import Playlist from '../components/home/Playlist';
import { useState, useEffect } from 'react';
import { DefaultButton } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { ButtonWrapper, H2, ListStyle } from './RoomList';
import { getPlaylists } from '../api/playlistApi';
import { useSelector } from 'react-redux';
import { myValue } from '../slices/mySlice';

export type PlaylistInfoType = {
	playlistId: number;
	title: string;
	status: string;
	videoId: string[];
	category: string[];
	like: number;
	createdAt: string;
	modifiedAt: string;
	name: string;
};

function PlaylistList() {
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(16);
	const [playlists, setPlayLists] = useState([]);

	const { memberId } = useSelector(myValue);

	useEffect(() => {
		getPlaylists(memberId, page, size).then((res) => {
			console.log('getPlaylists res', res);

			setPlayLists(res.data);
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
							<Playlist playlist={playlist} key={playlist.playlistId} />
					  ))
					: null}
			</ListStyle>
		</>
	);
}

export default PlaylistList;
