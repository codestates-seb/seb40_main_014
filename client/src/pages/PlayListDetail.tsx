import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPlayList } from '../api/playlistApi';
import MusicList from '../components/playlist/MusicList';
import PlayListInfo from '../components/playlist/PlayListInfo';
import { musicInfoType } from './MakePlayList';

export type plinfo = {
	memberId: string;
	playListId?: number;
	title: string;
	playlist: Array<musicInfoType>;
	categoryList: Array<string>;
	status: boolean;
	like?: number;
};

export type PlayListInfoProps = {
	playListInfo?: plinfo;
	setPlayListInfo?: Dispatch<SetStateAction<plinfo>>;
	plList?: Array<musicInfoType>;
	setPlList?: Dispatch<SetStateAction<Array<musicInfoType>>>;
};

const PlayListDetail = () => {
	const [playListInfo, setPlayListInfo] = useState<plinfo>();
	const { id } = useParams();
	useEffect(() => {
		getPlayList(id).then((res) => {
			if (res.code) {
				alert(res);
			} else {
				setPlayListInfo(res);
			}
		});
	}, []);

	const props: PlayListInfoProps = {
		playListInfo,
		setPlayListInfo,
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
	display: flex;
	flex-direction: column;
`;
