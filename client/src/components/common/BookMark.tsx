import { BsBookmarksFill, BsBookmarks } from 'react-icons/bs';
import { postBookMark } from '../../api/playlistApi';
import { LikebookmarkType } from './Like';

const BookMark = ({
	playlistId,
	memberId,
	isLogin,
	loginId,
	setPlayListInfo,
	bookmarkState,
}: LikebookmarkType) => {
	const onClickBookMark = () => {
		postBookMark(playlistId).then((res) =>
			setPlayListInfo((prev) => {
				const copy = { ...prev };
				copy.bookmarkState = res.data.bookmarkState;
				return copy;
			}),
		);
	};

	return (
		<>
			{loginId !== memberId &&
				isLogin &&
				(bookmarkState ? (
					<BsBookmarksFill
						color="#40c057"
						size="24"
						onClick={onClickBookMark}
						cursor={'pointer'}
					/>
				) : (
					<BsBookmarks
						color="#40c057"
						size="24"
						onClick={onClickBookMark}
						cursor={'pointer'}
					/>
				))}
		</>
	);
};

export default BookMark;
