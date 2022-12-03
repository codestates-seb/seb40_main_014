import { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { followUser } from '../../api/userApi';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import { myLogin } from '../../slices/mySlice';
import BookMark from '../common/BookMark';
import { FollowList } from '../mypage/Content';
import { Follower } from '../mypage/MypageInfo';
import ModifyButton from './ModifyButton';

type PlaylistType = {
	playList?: PlaylistInfoType;
	followList?: FollowList;
	id: number;
	userId: number;
	memberId: number;
	setPlayLists?: Dispatch<SetStateAction<Array<object>>>;
	name: string;
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
	name,
}: PlaylistType) => {
	const isLogin = useSelector(myLogin);

	const [followCheck, setFollowCheck] = useState(true);

	const handleFollow = () => {
		followUser(followList.memberId).then((res) => {
			const { followState } = res.data;

			setFollowCheck(followState);
		});
	};

	return (
		<CplayListStyle className="wrapper">
			{id === 1 || id === 2 ? (
				<Link to={`/playlistdetail/${playList.playlistId}`}>
					<LinkCollection>
						<Img src={playList.playlistItems[0].thumbnail} alt="썸네일" />
						<Title className="title">{playList.title}</Title>
						<Detail>{id === 1 ? name : playList.name}</Detail>
					</LinkCollection>
				</Link>
			) : (
				<Link to={`/mypage/${followList.memberId}`}>
					<LinkCollection>
						<Img src={followList.picture} alt="프로필" follow />
						<Title className="title">{followList.name}</Title>
						<Detail>{followList.content}</Detail>
					</LinkCollection>
				</Link>
			)}
			{userId === memberId && (
				<Buttons>
					{id === 1 && (
						<ModifyButton
							playlistId={playList.playlistId}
							setPlayLists={setPlayLists}
							playlistName={playList.title}
						/>
					)}
					{id === 2 && (
						<BookMark
							playlistId={playList.playlistId}
							memberId={playList.memberId}
							isLogin={isLogin}
							loginId={memberId}
							bookmarkState={playList.bookmarkState}
						/>
					)}
					{id === 3 && (
						<CollectionFollwer>
							<button onClick={handleFollow}>
								{followCheck ? '언팔로우' : '팔로우'}
							</button>
						</CollectionFollwer>
					)}
				</Buttons>
			)}
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
	width: 100%;

	// Mobile
	@media screen and (max-width: 640px) {
		flex-direction: column;
		align-items: flex-start;
		padding: 20px;
		> *:first-child {
			width: 100%;
		}
		> *:last-child {
			width: 100%;
		}
	}
`;

const LinkCollection = styled.div`
	width: 100%;
	display: flex;
	align-items: center;

	:hover {
		opacity: 0.75;
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

export const Title = styled.h4`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	word-break: break-all;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.small};
	}
`;

const Detail = styled.div`
	margin-left: 10px;
	color: ${(props) => props.theme.colors.gray500};
	font-size: ${(props) => props.theme.fontSize.small};

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	word-break: break-all;

	// Mobile
	@media screen and (max-width: 640px) {
		display: none;
	}
`;

const CollectionFollwer = styled(Follower)`
	button {
		margin: 0;
		padding: 6px 7px;
	}
`;

const Buttons = styled.div`
	// Mobile
	@media screen and (max-width: 640px) {
		margin-top: 10px;
		display: flex;
		justify-content: flex-end;
	}
`;
