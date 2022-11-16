import styled from 'styled-components';
import MypageContents from '../components/Mypage/MypageContents';
import MypageInfo from '../components/Mypage/MypageInfo';
const testList = ['1', '2', '3', '4', '5'];
const Mypage = () => {
	const contentList = [
		'나의 플레이 리스트',
		'북마크한 플레이리스트',
		'팔로우 한 DJ',
	];
	return (
		<MypageStyle>
			<MypageInfo />
			{contentList.map((ele) => {
				return <MypageContents key={ele} title={ele} contents={testList} />;
			})}
		</MypageStyle>
	);
};

export default Mypage;

const MypageStyle = styled.div``;
