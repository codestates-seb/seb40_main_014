import { BsBookmarksFill, BsBookmarks } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { updateBookMark } from '../../api/playlistApi';
import { changeBookMarkList } from '../../slices/mySlice';

type BookMarkType = {
	bookMarkList: Array<number>;
	playListId: number;
	memberId: string;
};

const BookMark = ({ bookMarkList, playListId, memberId }: BookMarkType) => {
	const dispatch = useDispatch();
	const data: any = {
		memberId,
		playListId,
	};
	const updateBookMarkList = () => {
		updateBookMark(data).then((res) => {
			dispatch(changeBookMarkList(res.bookmarklist));
		});
	};
	const onClickAddBookMark = () => {
		data.type = 'add';
		updateBookMarkList();
	};
	const onClickCancelBookMark = () => {
		data.type = 'cancel';
		updateBookMarkList();
	};
	return (
		<>
			{bookMarkList.includes(playListId) ? (
				<BsBookmarksFill
					color="#40c057"
					size="24"
					onClick={onClickCancelBookMark}
				/>
			) : (
				<BsBookmarks size="24" onClick={onClickAddBookMark} />
			)}
		</>
	);
};

export default BookMark;
