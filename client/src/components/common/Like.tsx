import { Dispatch, SetStateAction } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import styled from 'styled-components';
import { postLike } from '../../api/playlistApi';
import { plinfo } from '../../pages/PlayListDetail';

export type LikebookmarkType = {
	playlistId: number;
	setPlayListInfo?: Dispatch<SetStateAction<plinfo>>;
	isLogin: boolean;
	loginId: number;
	memberId: number;
	likeState?: boolean;
	bookmarkState?: boolean;
	likeCount?: number;
};

const Like = ({
	playlistId,
	setPlayListInfo,
	isLogin,
	likeState,
	likeCount,
}: LikebookmarkType) => {
	const onClickLike = () => {
		postLike(playlistId).then((res) =>
			setPlayListInfo((prev) => {
				const copy = { ...prev };
				copy.like = res.data.like;
				copy.likeState = res.data.likeState;
				return copy;
			}),
		);
	};
	return (
		<>
			{isLogin ? (
				likeState ? (
					<LikeStyle onClick={onClickLike}>
						<HiHeart color="#f783ac" size="24" />
						<span>{likeCount}</span>
					</LikeStyle>
				) : (
					<LikeStyle onClick={onClickLike}>
						<HiOutlineHeart color="#f783ac" size="24" />
						<span>{likeCount}</span>
					</LikeStyle>
				)
			) : (
				<HiHeart color="#f783ac" size="24" />
			)}
		</>
	);
};

export default Like;

const LikeStyle = styled.button``;
