import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookmarkList, getFollowList, getUserInfo } from '../api/userApi';
import MypageContents from '../components/mypage/MypageContents';
import MypageInfo from '../components/mypage/MypageInfo';
import {
	myInitialStateValue,
	MyInitialStateValue,
	myLogin,
	myValue,
} from '../slices/mySlice';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { MinHeightWrapper } from './RoomList';
import Loading from '../components/common/Loading';
import { PlaylistInfoType } from './PlaylistList';
import { FollowList } from '../components/mypage/Content';

export type content = {
	id: number;
	title: string;
	contents: Array<PlaylistInfoType> | Array<FollowList>;
	userInfo?: MyInitialStateValue;
};

const Mypage = () => {
	const navigate = useNavigate();
	const { userId } = useParams();

	const myId = useSelector(myValue).memberId;
	const isLogin = useSelector(myLogin);

	const [isLoading, setLoading] = useState(true);
	const [userInfo, setUserInfo] =
		useState<MyInitialStateValue>(myInitialStateValue);

	const [contentList, setContentList] = useState<Array<content>>([
		{ id: 1, title: `${userInfo.name}님의 플레이리스트`, contents: [] },
		{ id: 2, title: '보관한 플레이리스트', contents: [] },
		{ id: 3, title: '팔로우 한 DJ', contents: [] },
	]);

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
			setLoading(true);
			//유저 정보 + 유저 플레이 리스트
			getUserInfo(Number(userId))
				.then((res) => {
					setUserInfo(res.data);
					setContentList((prev) => {
						const copy = [...prev];
						copy[0].title = `${res.data.name}님의 플레이리스트`;
						copy[0].contents = res.data.playlist.data;
						return copy;
					});

					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
			//유저가 보관한 플레이리스트
			getBookmarkList(Number(userId))
				.then((res) => {
					setContentList((prev) => {
						const copy = [...prev];
						copy[1].contents = res.data;
						return copy;
					});
				})
				.catch((err) => {
					console.log(err);
				});
			//유저가 팔로우 한 사람들
			getFollowList(Number(userId))
				.then((res) => {
					setContentList((prev) => {
						const copy = [...prev];
						copy[2].contents = res.data;
						return copy;
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [userId]);

	return (
		<MinHeightWrapper>
			{!isLoading && isLogin && (
				<>
					<MypageInfo userInfo={userInfo} myId={myId} />
					{contentList.map((ele) => {
						return (
							<MypageContents
								key={ele.id}
								id={ele.id}
								title={ele.title}
								contents={ele.contents}
								userInfo={userInfo}
							/>
						);
					})}
				</>
			)}
			{isLoading && <Loading />}
		</MinHeightWrapper>
	);
};

export default Mypage;
