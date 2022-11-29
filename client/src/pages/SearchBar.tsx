import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DefaultButton } from '../components/common/Button';
import { MinHeightWrapper } from './RoomList';

const SearchBar = () => {
	const navigate = useNavigate();

	const selectOneRef = useRef(null);
	const selectTwoRef = useRef(null);
	const inputRef = useRef(null);

	const [typeOne, setTypeOne] = useState('');
	const [typeTwo, setTypeTwo] = useState('');
	const [text, setText] = useState('');

	const [typeTwoOptions, setTypeTwoOptions] = useState([
		{ value: '', text: '선택' },
	]);

	const onSelectOneChange = (e) => {
		console.log('#1', e.target.value);
		setTypeOne(e.target.value);
	};

	const onSelectTwoChange = (e) => {
		console.log('#2', e.target.value);
		setTypeTwo(e.target.value);
	};

	const onChangeText = (e) => {
		console.log('#3', e.target.value);
		setText(e.target.value);
	};

	useEffect(() => {
		if (!selectTwoRef.current) return;

		selectTwoRef.current.value = '';

		setTypeTwo('');
		setText('');

		if (!typeOne) {
			selectTwoRef.current.disabled = true;
			setTypeTwoOptions([{ value: '', text: '선택' }]);
		} else {
			selectTwoRef.current.disabled = false;
			if (typeOne === 'room') {
				setTypeTwoOptions([
					{ value: '', text: '선택' },
					{ value: 'title', text: '방 제목' },
					{ value: 'category', text: '방 장르' },
					{ value: 'name', text: '방장명' },
				]);
			}
			if (typeOne === 'playlist') {
				setTypeTwoOptions([
					{ value: '', text: '선택' },
					{ value: 'title', text: '플레이리스트 제목' },
					{ value: 'category', text: '플레이리스트 장르' },
					{ value: 'name', text: '작성자명' },
				]);
			}
			if (typeOne === 'user') {
				setTypeTwoOptions([
					{ value: '', text: '선택' },
					{ value: 'name', text: '유저명' },
				]);
			}
		}
	}, [typeOne]);

	useEffect(() => {
		if (!inputRef.current) return;

		setText('');

		if (typeOne && typeTwo) {
			inputRef.current.disabled = false;
		} else {
			inputRef.current.disabled = true;
		}
	}, [typeOne, typeTwo]);

	const onSearch = () => {
		console.log(typeOne, typeTwo, text);

		navigate(`/search?type1=${typeOne}&type2=${typeTwo}&q=${text}`);
	};

	return (
		<SearchBarStyle>
			<div>
				{/* 카테고리 One */}
				<select onChange={onSelectOneChange} ref={selectOneRef}>
					<option value="">선택</option>
					<option value="room">방</option>
					<option value="playlist">플레이리스트</option>
					<option value="user">유저</option>
				</select>

				{/* 카테고리 Two */}
				<select onChange={onSelectTwoChange} ref={selectTwoRef} disabled>
					{typeTwoOptions.map((el, idx) => (
						<option value={el.value} key={idx}>
							{el.text}
						</option>
					))}
				</select>

				{/* 입력창 */}
				<input
					type="text"
					placeholder="검색어를 입력하세요"
					value={text}
					onChange={onChangeText}
					ref={inputRef}
					disabled
				/>
			</div>

			<DefaultButton onClick={onSearch}>검색</DefaultButton>
		</SearchBarStyle>
	);
};

export default SearchBar;

const SearchBarStyle = styled(MinHeightWrapper)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 800px;
	margin: 0 auto;

	> div:first-of-type {
		display: flex;
		align-items: center;
		width: 85%;
		margin-right: 3%;
		> * {
			height: 45px;
			padding: 0 10px;
			background-color: ${(props) => props.theme.colors.white};
			border: 1.5px solid ${(props) => props.theme.colors.gray400};

			:focus {
				background-color: #e2d5fc9c;
			}

			:disabled {
				background-color: inherit;
			}
		}
		> select {
			width: 25%;
			font-size: 14px;
		}
		> input {
			width: 47%;
		}
		option:first-of-type {
			background-color: ${(props) => props.theme.colors.gray400};
		}

		> *:nth-child(1) {
			border-radius: 5px 0 0 5px;
		}
		> *:nth-child(2) {
			border-left: none;
			border-right: none;
		}
		> *:nth-child(3) {
			border-radius: 0 5px 5px 0;
		}
	}

	> button {
		width: 15%;
	}

	// Mobile
	@media screen and (max-width: 640px) {
		flex-direction: column;

		> div:first-of-type {
			width: 100%;
			margin-right: 0;
			margin-bottom: 20px;
			> select {
				width: 20%;
				font-size: 12px;
			}
			> input {
				width: 60%;
			}
		}

		> button {
			width: 100%;
		}
	}
`;
