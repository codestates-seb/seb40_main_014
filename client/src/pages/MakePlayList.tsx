import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
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
import { MinHeightWrapper } from './RoomList';

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
			Swal.fire({
				icon: 'warning',
				text: '로그인 후 이동하실 수 있습니다.',
				confirmButtonText: '뒤로가기',
			}).then(() => {
				navigate(-1);
			});
		} else {
			if (type === 'modify') {
				getPlayList(id)
					.then((res) => {
						const data = res.data;
						setPlId(data.playlistId);
						setPlTitle(data.title);
						setPlList(data.playlistItems);
						setCategoryList(data.categoryList);
						setStatus(!data.status);
					})
					.catch((err) => {
						console.log(err);
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
			createPlayList(data)
				.then(() => {
					navigate(`/mypage/${myvalue.memberId}`);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const modifyPl = () => {
		if (validation(data)) {
			data.playlistId = plId;
			modifyPlayList(data)
				.then(() => {
					navigate(-1);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<MakePlayListStyle>
			<PlayListSetting {...settingProps} />
			{plList && <MusicList {...props} />}
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
		</MakePlayListStyle>
	);
};

export default MakePlayList;

const MakePlayListStyle = styled(MinHeightWrapper)`
	display: flex;
	flex-direction: column;
`;
