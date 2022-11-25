import { BsBookmarksFill, BsBookmarks } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { myLogin } from '../../slices/mySlice';

type BookMarkType = {
	playlistId: number;
};

const BookMark = ({ playlistId }: BookMarkType) => {
	const check = false;
	const isLogin = useSelector(myLogin);
	const onClickBookMark = () => {
		console.log('bookmark');
	};
	return (
		<>
			{isLogin &&
				(check ? (
					<BsBookmarksFill
						color="#40c057"
						size="24"
						onClick={onClickBookMark}
					/>
				) : (
					<BsBookmarks color="#40c057" size="24" onClick={onClickBookMark} />
				))}
		</>
	);
};

export default BookMark;
