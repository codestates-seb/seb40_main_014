import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPlayList } from '../api/listApi';
import MusicList, { music } from '../components/playlist/MusicList';
import PlayListInfo from '../components/playlist/PlayListInfo';

export type plinfo = {
	title: string;
	category: string;
	author: string;
	like: number;
	desc: string;
	total: number;
	musiclist: Array<music>;
};

export type PlayListInfoProps = {
	playListInfo?: plinfo;
};

const PlayListDetail = () => {
	const [playListInfo, setPlayListInfo] = useState<plinfo>();

	useEffect(() => {
		getPlayList().then((res) => {
			setPlayListInfo(res);
		});
	}, []);

	const props: PlayListInfoProps = {
		playListInfo,
	};
	return (
		<PlayListDetailStyle>
			{playListInfo && (
				<>
					<PlayListInfo {...props} />
					<MusicList {...props} />
				</>
			)}
		</PlayListDetailStyle>
	);
};

export default PlayListDetail;

const PlayListDetailStyle = styled.div`
	margin: 3%;
	display: flex;
	flex-direction: column;
`;
