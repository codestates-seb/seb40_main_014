import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { myLogin, myValue } from '../slices/mySlice';
import { PlayListInfoProps, plinfo } from './PlayListDetail';

export type musicInfoType = {
	channelTitle?: string;
	title?: string;
	thumbnail?: string;
	videoId?: string;
	url?: string;
};

const MakePlayList = () => {
	const navigate = useNavigate();
	const { type, id } = useParams();

	const isLogin = useSelector(myLogin);
	const myvalue = useSelector(myValue);

	const [plTitle, setPlTitle] = useState<string>('');
	const [plId, setPlId] = useState<number>();
	const [plList, setPlList] = useState<Array<musicInfoType>>([]);
	const [categoryList, setCategoryList] = useState<Array<string>>([]);
	const [status, setStatus] = useState<boolean>(false);

	const [titleError, setTitleError] = useState('');
	const [categoryError, setCategoryError] = useState('');
	const [playlistError, setPlaylistError] = useState('');

	useEffect(() => {
		if (!isLogin) {
			navigate('/');
		} else {
			if (type === 'modify') {
				getPlayList(id).then((res) => {
					if (res.data) {
						const data = res.data;
						setPlId(data.playlistId);
						setPlTitle(data.title);
						setPlList(data.playlistItems);
						setCategoryList(data.categoryList);
						setStatus(!data.status);
					}
				});
			}
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
		titleError,
		categoryError,
		playlistError,
		setPlaylistError,
	};

	const data: plinfo = {
		title: plTitle,
		playlistItems: plList,
		categoryList,
		status: !status,
	};

	// 유효성 검사
	const validation = (data) => {
		setTitleError('');
		setCategoryError('');
		setPlaylistError('');

		if (data.title.trim() === '') {
			setTitleError('제목을 입력해주세요');
			return false;
		}
		if (data.categoryList.length === 0) {
			setCategoryError('카테고리를 선택해 주세요 (1개 이상)');
			return false;
		}
		if (data.playlistItems.length === 0) {
			setPlaylistError('플레이리스트를 채워주세요');
			return false;
		}

		return true;
	};

	const createPl = () => {
		if (validation(data)) {
			console.log(data);
			createPlayList(data).then((res) => {
				if (res.data) navigate(`/mypage/${myvalue.memberId}`);
			});
		}
	};

	const modifyPl = () => {
		if (validation(data)) {
			data.playlistId = plId;
			modifyPlayList(data).then((res) => {
				if (res.data) navigate(-1);
			});
		}
	};

	return (
		<MinHeightWrapper>
			<PlayListSetting {...settingProps} />
			<MusicList {...props} />
			{type === 'modify' ? (
				<DefaultButton
					width="200px"
					height="50px"
					mobileWidth
					margin="0 auto"
					onClick={modifyPl}>
					수정
				</DefaultButton>
			) : (
				<DefaultButton
					width="200px"
					height="50px"
					mobileWidth
					margin="0 auto"
					onClick={createPl}>
					만들기
				</DefaultButton>
			)}
		</MinHeightWrapper>
	);
};

export default MakePlayList;

export const MinHeightWrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - 80px - 120px - 234px);

	// Tablet
	@media screen and (max-width: 980px) {
		min-height: calc(100vh - 76px - 120px - 234px);
	}
	// Mobile
	@media screen and (max-width: 640px) {
		min-height: calc(100vh - 72.406px - 120px - 234px);
	}
`;
