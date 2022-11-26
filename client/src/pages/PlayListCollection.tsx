import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getPlaylists } from '../api/playlistApi';
import { getUserInfo } from '../api/userApi';
import CplayList from '../components/playlistcollection/CplayList';
import { myValue } from '../slices/mySlice';
import { PlaylistInfoType } from './PlaylistList';

const UserPlayList = () => {
	const [playlists, setPlayLists] = useState([]);

	const { memberId } = useSelector(myValue);

	// useEffect(() => {
	// 	getPlaylists(memberId).then((res) => {
	// 		console.log('getPlaylists res', res);

	// 		setPlayLists(res);
	// 	});
	// }, []);

	// 유진 test
	useEffect(() => {
		getUserInfo(memberId).then((res) => {
			if (res.data) {
				console.log('getUserInfo res', res);

				setPlayLists(res.data.playlist.data);
			} else {
				alert(res);
			}
		});
	}, []);

	return (
		<UserPlayListStyle>
			<div className="title">USERNAME의 플레이리스트</div>
			<PlayListsWrapper>
				{playlists &&
					playlists.map((playlist: PlaylistInfoType) => {
						return <CplayList key={playlist.playlistId} playList={playlist} />;
					})}
			</PlayListsWrapper>
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
		margin-bottom: 60px;

		// Mobile
		@media screen and (max-width: 640px) {
			font-size: 24px;
		}
	}
`;

const PlayListsWrapper = styled.div`
	width: 100%;
	max-width: 700px;
	box-shadow: 0 0 10px #00000013;
	border-radius: 10px;

	> div:first-of-type {
		border-radius: 10px 10px 0 0;
	}
	> div:not(:last-of-type) {
		border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
	}
	> div:last-of-type {
		border-radius: 0 0 10px 10px;
	}
`;
