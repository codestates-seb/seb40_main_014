import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo } from '../api/userApi';
import MypageContents from '../components/Mypage/MypageContents';
import MypageInfo from '../components/Mypage/MypageInfo';
import {
	myInitialStateValue,
	MyInitialStateValue,
	myValue,
} from '../slices/mySlice';
import { useState, useEffect } from 'react';
import { PlaylistInfoType } from './PlaylistList';

type content = {
	id: number;
	title: string;
	contents: Array<PlaylistInfoType>;
};
const Mypage = () => {
	const [contentList, setContentList] = useState<Array<content>>([
		{ id: 1, title: '나의 플레이리스트', contents: [] },
		{ id: 2, title: '북마크한 플레이리스트', contents: [] },
		{ id: 3, title: '팔로우 한 DJ', contents: [] },
	]);
	const { userId } = useParams();
	const myId = useSelector(myValue).memberId;

	const [userInfo, setUserInfo] =
		useState<MyInitialStateValue>(myInitialStateValue);

	useEffect(() => {
		getUserInfo(Number(userId)).then((res) => {
			if (res.data) {
				console.log('getUserInfo res', res);

				setUserInfo(res.data);
				setContentList((prev) => {
					prev[0].contents = res.data.playlist.data;
					return prev;
				});
			} else {
				alert(res);
			}
		});
	}, []);

	return (
		<MypageStyle>
			<MypageInfo userInfo={userInfo} myId={myId} />
			{contentList.map((ele) => {
				return (
					<MypageContents
						key={ele.id}
						title={ele.title}
						contents={ele.contents}
					/>
				);
			})}
		</MypageStyle>
	);
};

export default Mypage;

const MypageStyle = styled.div``;
