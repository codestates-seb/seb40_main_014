import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getPlaylists } from '../api/playlistApi';
import CplayList from '../components/playlistcollection/CplayList';
import { myValue } from '../slices/mySlice';
import { PlaylistInfoType } from './PlaylistList';

const UserPlayList = () => {
	const [playlists, setPlayLists] = useState([]);

	const { memberId } = useSelector(myValue);

	useEffect(() => {
		getPlaylists(memberId).then((res) => {
			console.log('getPlaylists res', res);

			setPlayLists(res);
		});
	}, []);
	return (
		<UserPlayListStyle>
			<div className="title">USERNAME의 플레이리스트</div>
			{playlists &&
				playlists.map((playlist: PlaylistInfoType) => {
					return <CplayList key={playlist.playListId} playList={playlist} />;
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
		font-weight: 600;
		margin: 5% 0;
	}
`;
