import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPlayList } from '../api/playlistApi';
import { getUserInfo } from '../api/userApi';
import MusicList from '../components/playlist/MusicList';
import PlayListInfo from '../components/playlist/PlayListInfo';
import { musicInfoType } from './MakePlayList';

export type plinfo = {
	memberId?: number;
	name?: string;
	playlistId?: number;
	title: string;
	playlistItems: Array<musicInfoType>;
	categoryList: Array<string>;
	status: boolean;
	like?: number;
	likeState?: boolean;
	bookmarkState?: boolean;
};

export type PlayListInfoProps = {
	playListInfo?: plinfo;
	setPlayListInfo?: Dispatch<SetStateAction<plinfo>>;
	plList?: Array<musicInfoType>;
	setPlList?: Dispatch<SetStateAction<Array<musicInfoType>>>;
	picture?: string;
};

const PlayListDetail = () => {
	const [playListInfo, setPlayListInfo] = useState<plinfo>();
	const [picture, setPicture] = useState<string>();

	const { id } = useParams();
	useEffect(() => {
		getPlayList(id).then((res) => {
			if (res.data) {
				setPlayListInfo(res.data);
				getUserInfo(res.data.memberId).then((res) =>
					setPicture(res.data.picture),
				);
			} else {
				alert(res);
			}
		});
	}, []);

	const props: PlayListInfoProps = {
		playListInfo,
		picture,
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
