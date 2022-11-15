import Playlist from '../components/home/Playlist';
import { useState, useEffect } from 'react';
import { getPlayLists } from '../api/listApi';
import { DefaultButton } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { ButtonWrapper, H2, ListsStyle } from './RoomList';

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
	const [playlists, setPlayLists] = useState([]);

	useEffect(() => {
		getPlayLists().then((res) => {
			console.log('#1', res);
			setPlayLists(res);
		});
	}, []);

	return (
		<>
			<ButtonWrapper>
				<Link to="/addPlaylist">
					<DefaultButton>플리 만들기</DefaultButton>
				</Link>
			</ButtonWrapper>
			<H2>플레이리스트 Top 8</H2>
			<H2>최신 플레이리스트</H2>
			<ListsStyle>
				{playlists.map((playlist: PlaylistInfoType) => (
					<Playlist playlist={playlist} key={playlist.playlistId} />
				))}
			</ListsStyle>
		</>
	);
}

export default PlaylistList;
