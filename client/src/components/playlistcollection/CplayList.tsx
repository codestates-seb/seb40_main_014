import { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { followUser } from '../../api/userApi';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import { myLogin } from '../../slices/mySlice';
import BookMark from '../common/BookMark';
import { Follower } from '../Mypage/MypageInfo';
import ModifyButton from './ModifyButton';

type PlaylistType = {
	playList?: PlaylistInfoType;
	followList?: any;
	id: number;
	userId: number;
	memberId: number;
	setPlayLists?: Dispatch<SetStateAction<Array<object>>>;
};

type ImgProps = {
	follow?: boolean;
};

const CplayList = ({
	playList,
	followList,
	id,
	userId,
	memberId,
	setPlayLists,
}: PlaylistType) => {
	const isLogin = useSelector(myLogin);

	const [followCheck, setFollowCheck] = useState(true);

	const handleFollow = () => {
		followUser(followList.memberId).then((res) => {
			console.log('follow res', res);

			const { followState } = res.data;

			setFollowCheck(followState);
		});
	};

	return (
		<CplayListStyle>
			<div>
				{id === 3 ? (
					<>
						<Img src={followList.picture} alt="userPicture" follow />
						<Title>
							<Link to={`/mypage/${followList.memberId}`}>
								{followList.name}
							</Link>
						</Title>
						<Follower>
							{isLogin &&
								userId === memberId &&
								followList.memberId !== memberId && (
									<button onClick={handleFollow}>
										{followCheck ? '언팔로우' : '팔로우'}
									</button>
								)}
						</Follower>
					</>
				) : (
					<>
						<Img src={playList.playlistItems[0].thumbnail} alt="thumbnail" />
						<Title>
							<Link to={`/playlistdetail/${playList.playlistId}`}>
								{playList.title}
							</Link>
						</Title>
					</>
				)}
			</div>
			<div>
				{id === 1 && userId === memberId && (
					<ModifyButton
						playlistId={playList.playlistId}
						setPlayLists={setPlayLists}
						playlistName={playList.title}
					/>
				)}
				{id === 2 && userId === memberId && (
					<BookMark
						playlistId={playList.playlistId}
						memberId={playList.memberId}
						isLogin={isLogin}
						loginId={memberId}
					/>
				)}
			</div>
		</CplayListStyle>
	);
};

export default CplayList;

const CplayListStyle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 30px;
	background-color: ${(props) => props.theme.colors.white};

	> div:first-of-type {
		display: flex;
		align-items: center;
	}

	:hover {
		background-color: ${(props) => props.theme.colors.gray100};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		flex-direction: column;
		align-items: flex-start;
		padding: 20px;
		> div:first-of-type {
			margin-bottom: 10px;
		}
		> div:last-of-type {
			width: 100%;
		}
	}
`;

const Img = styled.img<ImgProps>`
	width: ${(props) => (props.follow ? '35px' : '60px')};
	border-radius: ${(props) => (props.follow ? '50%' : '3px')};
	margin-right: 20px;

	// Mobile
	@media screen and (max-width: 640px) {
		width: ${(props) => (props.follow ? '30px' : '50px')};
		margin-right: 10px;
	}
`;

const Title = styled.h4`
	:hover {
		color: ${(props) => props.theme.colors.purple};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 14px;
	}
`;
