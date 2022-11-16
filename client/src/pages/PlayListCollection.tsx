import styled from 'styled-components';
import CplayList from '../components/playlistcollection/CplayList';

const UserPlayList = () => {
	const testlist = ['1', '2', '3'];
	return (
		<UserPlayListStyle>
			<div className="title">USERNAME의 플레이리스트</div>
			{testlist.map((ele) => {
				return <CplayList key={ele} playlist={ele} />;
			})}
		</UserPlayListStyle>
	);
};

export default UserPlayList;

const UserPlayListStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.title {
		font-size: ${(props) => props.theme.fontSize.xLarge};
		font-weight: 700;
		margin: 5% 0;
	}
`;
