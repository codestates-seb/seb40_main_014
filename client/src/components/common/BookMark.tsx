import { postBookMark } from '../../api/playlistApi';
import { LikebookmarkType } from './Like';
import { RiFolderAddLine, RiFolderReduceFill } from 'react-icons/ri';
import styled from 'styled-components';
import { useState } from 'react';

const BookMark = ({
	playlistId,
	memberId,
	isLogin,
	loginId,
	bookmarkState,
}: LikebookmarkType) => {
	const [state, setState] = useState(bookmarkState);
	const onClickBookMark = () => {
		postBookMark(playlistId).then(() => {
			setState((prev) => !prev);
		});
	};

	return (
		<>
			{loginId !== memberId &&
				isLogin &&
				(state ? (
					<BookmarkStyle onClick={onClickBookMark}>
						<RiFolderReduceFill size="22" color="#333333" />
						<span>보관함에서 삭제</span>
					</BookmarkStyle>
				) : (
					<BookmarkStyle onClick={onClickBookMark}>
						<RiFolderAddLine size="22" color="#333333" />
						<span>보관함에 저장</span>
					</BookmarkStyle>
				))}
		</>
	);
};

export default BookMark;

const BookmarkStyle = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;

	span {
		margin-left: 5px;
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 14px !important;
	}
`;
