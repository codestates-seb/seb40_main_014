import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPlayList } from '../api/listApi';
import MusicList from '../components/playlist/MusicList';
import PlayListInfo from '../components/playlist/PlayListInfo';
import {
	music,
	MusicListProps,
	PlayListInfoProps,
	plinfo,
} from '../types/types';

const PlayListDetail = () => {
	const [playListInfo, setPlayListInfo] = useState<plinfo>();
	const [musicList, setMusicList] = useState<Array<music>>();

	useEffect(() => {
		getPlayList().then((res) => {
			setPlayListInfo({
				title: res.title,
				category: res.category,
				author: res.author,
				like: res.like,
				desc: res.desc,
				total: res.total,
			});
			setMusicList(res.musiclist);
		});
	}, []);

	const PlayListInfoProps: PlayListInfoProps = {
		playListInfo,
	};
	const MusicListProps: MusicListProps = {
		musicList,
	};
	return (
		<PlayListDetailStyle>
			{playListInfo && <PlayListInfo {...PlayListInfoProps} />}
			{MusicListProps && <MusicList {...MusicListProps} />}
		</PlayListDetailStyle>
	);
};

export default PlayListDetail;

const PlayListDetailStyle = styled.div`
	margin: 3%;
	display: flex;
	flex-direction: column;
	border: 1px solid purple;
`;
