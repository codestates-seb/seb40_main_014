import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPlayList } from '../api/listApi';
import { DefaultButton } from '../components/common/Button';
import MusicList from '../components/playlist/MusicList';
import PlayListSetting from '../components/playlist/PlayListSetting';
import { PlayListInfoProps, plinfo } from './PlayListDetail';

const PlayListModify = () => {
	const [playListInfo, setPlayListInfo] = useState<plinfo>();
	const [plTitle, setPlTitle] = useState<string>();
	const [plCategory, setPlCategory] = useState<string>();

	useEffect(() => {
		getPlayList().then((res) => {
			setPlayListInfo(res);
		});
	}, []);

	const props: PlayListInfoProps = {
		playListInfo,
	};

	const settingProps = {
		setPlTitle,
		setPlCategory,
	};
	return (
		<PlayListModifyStyle>
			<PlayListSetting {...settingProps} />
			<MusicList {...props} />
			{playListInfo ? (
				<DefaultButton>수정</DefaultButton>
			) : (
				<DefaultButton>만들기</DefaultButton>
			)}
		</PlayListModifyStyle>
	);
};

export default PlayListModify;

const PlayListModifyStyle = styled.div`
	display: flex;
	flex-direction: column;
`;
