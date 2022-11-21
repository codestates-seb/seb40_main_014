import { Dispatch, SetStateAction } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { patchLike } from '../../api/playlistApi';
import { plinfo } from '../../pages/PlayListDetail';
import { changeLikeList } from '../../slices/mySlice';

type LikeType = {
	likeList: Array<number>;
	playListId: number;
	memberId: string;
	setPlayListInfo?: Dispatch<SetStateAction<plinfo>>;
};

const Like = ({
	likeList,
	playListId,
	memberId,
	setPlayListInfo,
}: LikeType) => {
	const dispatch = useDispatch();
	const data: any = {
		memberId,
		playListId,
	};
	const updateLikeList = () => {
		patchLike(data).then((res) => {
			dispatch(changeLikeList(res.likelist));
			setPlayListInfo((prev) => {
				prev.like = res.likelist.length;
				return prev;
			});
		});
	};
	const onClickLike = () => {
		data.type = 'like';
		updateLikeList();
	};
	const onClickUnLike = () => {
		data.type = 'unlike';
		updateLikeList();
	};
	return (
		<>
			{likeList.includes(playListId) ? (
				<HiHeart color="#f783ac" size="24" onClick={onClickUnLike} />
			) : (
				<HiOutlineHeart color="#f783ac" size="24" onClick={onClickLike} />
			)}
		</>
	);
};

export default Like;
