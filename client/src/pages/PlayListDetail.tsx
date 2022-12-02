import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { getPlayList } from '../api/playlistApi';
import { getUserInfo } from '../api/userApi';
import MusicList from '../components/playlist/MusicList';
import PlayListInfo from '../components/playlist/PlayListInfo';
import { myLogin } from '../slices/mySlice';
import { musicInfoType } from './MakePlayList';
import { MinHeightWrapper } from './RoomList';

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
	const navigate = useNavigate();

	const isLogin = useSelector(myLogin);

	const [playListInfo, setPlayListInfo] = useState<plinfo>();
	const [picture, setPicture] = useState<string>();

	const { id } = useParams();
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
			getPlayList(id)
				.then((res) => {
					setPlayListInfo(res.data);
					getUserInfo(res.data.memberId).then((res) =>
						setPicture(res.data.picture),
					);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	const props: PlayListInfoProps = {
		playListInfo,
		picture,
		setPlayListInfo,
	};
	return (
		<PlayListDetailStyle>
			{isLogin && playListInfo && (
				<>
					<PlayListInfo {...props} />
					<MusicList {...props} />
				</>
			)}
		</PlayListDetailStyle>
	);
};

export default PlayListDetail;

const PlayListDetailStyle = styled(MinHeightWrapper)`
	display: flex;
	flex-direction: column;
`;
