import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBookmarkList, getFollowList, getUserInfo } from '../api/userApi';
import MypageContents from '../components/Mypage/MypageContents';
import MypageInfo from '../components/Mypage/MypageInfo';
import {
	myInitialStateValue,
	MyInitialStateValue,
	myValue,
} from '../slices/mySlice';
import { useState, useEffect } from 'react';

type content = {
	id: number;
	title: string;
	contents: Array<any>;
};

const Mypage = () => {
	const { userId } = useParams();

	const myId = useSelector(myValue).memberId;

	const [userInfo, setUserInfo] =
		useState<MyInitialStateValue>(myInitialStateValue);

	const [contentList, setContentList] = useState<Array<content>>([
		{ id: 1, title: `${userInfo.name}님의 플레이리스트`, contents: [] },
		{ id: 2, title: '보관한 플레이리스트', contents: [] },
		{ id: 3, title: '팔로우 한 DJ', contents: [] },
	]);

	useEffect(() => {
		//유저 정보 + 유저 플레이 리스트
		getUserInfo(Number(userId)).then((res) => {
			if (res.data) {
				console.log('getUserInfo res', res);

				setUserInfo(res.data);
				setContentList((prev) => {
					const copy = [...prev];
					copy[0].title = `${res.data.name}님의 플레이리스트`;
					copy[0].contents = res.data.playlist.data;
					return copy;
				});
			}
		});
		//유저가 보관한 플레이리스트
		getBookmarkList(Number(userId)).then((res) => {
			if (res.data) {
				setContentList((prev) => {
					const copy = [...prev];
					copy[1].contents = res.data;
					return copy;
				});
			}
		});
		//유저가 팔로우 한 사람들
		getFollowList(Number(userId)).then((res) => {
			if (res.data) {
				setContentList((prev) => {
					const copy = [...prev];
					copy[2].contents = res.data;
					return copy;
				});
			}
		});
	}, [userId]);

	return (
		<>
			<MypageInfo userInfo={userInfo} myId={myId} />
			{contentList.map((ele) => {
				return (
					<MypageContents
						key={ele.id}
						id={ele.id}
						title={ele.title}
						contents={ele.contents}
					/>
				);
			})}
		</>
	);
};

export default Mypage;
