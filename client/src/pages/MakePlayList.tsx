import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
	createPlayList,
	getPlayList,
	modifyPlayList,
} from '../api/playlistApi';
import { DefaultButton } from '../components/common/Button';
import MusicList from '../components/playlist/MusicList';
import PlayListSetting from '../components/playlist/PlayListSetting';
import { PlayListInfoProps, plinfo } from './PlayListDetail';

export type musicInfoType = {
	channelTitle?: string;
	title?: string;
	thumbnail?: string;
	vedioId?: string;
	url?: string;
};
const MakePlayList = () => {
	const [plTitle, setPlTitle] = useState<string>('');
	const [plId, setPlId] = useState<number>();
	const [plList, setPlList] = useState<Array<musicInfoType>>([]);
	const [categoryList, setCategoryList] = useState<Array<string>>([]);
	const [status, setStatus] = useState<boolean>(true);
	const { type, id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		if (type === 'modify') {
			getPlayList(id).then((res) => {
				if (res.code) {
					alert(res);
				} else {
					setPlId(res.playlistId);
					setPlTitle(res.title);
					setPlList(res.playlist);
					setCategoryList(res.categoryList);
					setStatus(res.status);
				}
			});
		}
	}, []);

	const props: PlayListInfoProps = {
		plList,
		setPlList,
	};

	const settingProps = {
		setPlTitle,
		plTitle,
		setPlList,
		plList,
		setCategoryList,
		categoryList,
		setStatus,
		status,
	};
	const data: plinfo = {
		memberId: 'moon',
		title: plTitle,
		playlist: plList,
		categoryList,
		status,
	};

	const validation = (data) => {
		if (data.title.trim() === '') {
			alert('제목을 입력해주세요.');
			return false;
		}
		if (data.categoryList.length === 0) {
			alert('카테고리를 선택해 주세요.(1개 이상)');
			return false;
		}
		if (data.playlist.length === 0) {
			alert('PlayList를 채워주세요.');
			return false;
		}
		return true;
	};
	const createPl = () => {
		if (validation(data)) {
			createPlayList(data).then((res) => navigate('/playlistdetail'));
		}
	};
	const modifyPl = () => {
		if (validation(data)) {
			data.playListId = plId;
			modifyPlayList(data).then((res) => navigate('/playlistdetail'));
		}
	};
	return (
		<MakePlayListStyle>
			<PlayListSetting {...settingProps} />
			<MusicList {...props} />
			{type === 'modify' ? (
				<DefaultButton onClick={() => modifyPl()}>수정</DefaultButton>
			) : (
				<DefaultButton onClick={() => createPl()}>만들기</DefaultButton>
			)}
		</MakePlayListStyle>
	);
};

export default MakePlayList;

const MakePlayListStyle = styled.div`
	display: flex;
	flex-direction: column;
`;
