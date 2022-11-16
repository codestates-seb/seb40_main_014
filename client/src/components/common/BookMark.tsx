import { useState } from 'react';
import { BsBookmarksFill, BsBookmarks } from 'react-icons/bs';

const BookMark = () => {
	const [save, setSave] = useState<boolean>(false);
	const changeBookMark = () => {
		setSave((prev) => !prev);
	};
	return (
		<>
			{save ? (
				<BsBookmarksFill color="#40c057" onClick={changeBookMark} size="24" />
			) : (
				<BsBookmarks onClick={changeBookMark} size="24" />
			)}
		</>
	);
};

export default BookMark;
