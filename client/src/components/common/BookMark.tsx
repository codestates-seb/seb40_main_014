import { BsBookmarksFill, BsBookmarks } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { myLogin, myValue } from '../../slices/mySlice';

type BookMarkType = {
	playlistId: number;
	memberId: number;
};

const BookMark = ({ playlistId, memberId }: BookMarkType) => {
	const check = false;
	const isLogin = useSelector(myLogin);
	const onClickBookMark = () => {
		console.log('bookmark');
	};
	const myvalue = useSelector(myValue);
	return (
		<>
			{myvalue.memberId !== memberId &&
				isLogin &&
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
