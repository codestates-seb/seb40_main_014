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

const testList = ['1', '2', '3', '4', '5'];

const Mypage = () => {
	const contentList = [
		'나의 플레이리스트',
		'북마크한 플레이리스트',
		'팔로우 한 DJ',
	];

	const { userId } = useParams();
	const myId = useSelector(myValue).memberId;

	const [userInfo, setUserInfo] =
		useState<MyInitialStateValue>(myInitialStateValue);

	useEffect(() => {
		getUserInfo(Number(userId)).then((res) => {
			console.log('getUserInfo res', res);

			setUserInfo(res.data);
		});
	}, []);

	return (
		<MypageStyle>
			<MypageInfo userInfo={userInfo} myId={myId} />
			{contentList.map((ele) => {
				return <MypageContents key={ele} title={ele} contents={testList} />;
			})}
		</MypageStyle>
	);
};

export default Mypage;

const MypageStyle = styled.div``;
