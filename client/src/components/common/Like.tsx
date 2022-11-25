import { Dispatch, SetStateAction } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { patchLike } from '../../api/playlistApi';
import { plinfo } from '../../pages/PlayListDetail';
import { myLogin } from '../../slices/mySlice';

type LikeType = {
	playlistId: number;
	setPlayListInfo?: Dispatch<SetStateAction<plinfo>>;
};

const Like = ({ playlistId, setPlayListInfo }: LikeType) => {
	const check = false;
	const isLogin = useSelector(myLogin);
	const onClickLike = () => {
		console.log('like');
	};
	return (
		<>
			{isLogin ? (
				check ? (
					<HiHeart color="#f783ac" size="24" onClick={onClickLike} />
				) : (
					<HiOutlineHeart color="#f783ac" size="24" onClick={onClickLike} />
				)
			) : (
				<HiHeart color="#f783ac" size="24" />
			)}
		</>
	);
};

export default Like;
