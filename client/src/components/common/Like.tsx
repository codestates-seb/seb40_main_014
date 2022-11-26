import { Dispatch, SetStateAction } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { postLike } from '../../api/playlistApi';
import { plinfo } from '../../pages/PlayListDetail';

export type LikebookmarkType = {
	playlistId: number;
	setPlayListInfo: Dispatch<SetStateAction<plinfo>>;
	isLogin: boolean;
	loginId: number;
	memberId: number;
	likeState?: boolean;
	bookmarkState?: boolean;
};

const Like = ({
	playlistId,
	setPlayListInfo,
	isLogin,
	loginId,
	memberId,
	likeState,
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
			{loginId !== memberId && isLogin ? (
				likeState ? (
					<HiHeart
						color="#f783ac"
						size="24"
						onClick={onClickLike}
						cursor={'pointer'}
					/>
				) : (
					<HiOutlineHeart
						color="#f783ac"
						size="24"
						onClick={onClickLike}
						cursor={'pointer'}
					/>
				)
			) : (
				<HiHeart color="#f783ac" size="24" />
			)}
		</>
	);
};

export default Like;
