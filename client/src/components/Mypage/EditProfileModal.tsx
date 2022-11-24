import styled from 'styled-components';
import { Backdrop, H2, ModalStyle, WhiteBox } from '../home/LoginModal';
import { useEffect, useState } from 'react';
import { editUserInfo } from '../../api/userApi';
import { useDispatch } from 'react-redux';
import { myInfo } from '../../slices/mySlice';

type EditProfileModalType = {
	handleOpenModal: () => void;
	memberId: number;
	name: string;
};

const EditProfileModal = ({
	handleOpenModal,
	memberId,
	name,
}: EditProfileModalType) => {
	const dispatch = useDispatch();

	const [changeName, setChangeName] = useState(name);
	const [isError, setError] = useState(false);

	useEffect(() => {
		console.log(changeName);
	}, [changeName]);

	const onSubmit = () => {
		if (name === changeName) {
			setError(true);
			return;
		}

		editUserInfo(memberId, changeName).then((res) => {
			console.log('editUserInfo res', res);

			dispatch(myInfo(res.data));

			handleOpenModal();
		});
	};

	useEffect(() => {
		document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.cssText = '';
			window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
		};
	}, []);

	return (
		<ModalStyle>
			<EPWhiteBox>
				<EPH2>변경할 닉네임을 입력하세요</EPH2>
				<div>
					<Input
						value={changeName}
						onChange={(e) => {
							setChangeName(e.target.value);
						}}
						autoFocus
					/>
					{isError && <Error>기존 닉네임과 동일합니다.</Error>}
				</div>
				<ButtonWrapper>
					<SaveButton onClick={onSubmit}>저장</SaveButton>
					<CancelButton
						onClick={(e) => {
							e.preventDefault();
							handleOpenModal();
						}}>
						취소
					</CancelButton>
				</ButtonWrapper>
			</EPWhiteBox>
			<Backdrop
				onClick={(e) => {
					e.preventDefault();
					handleOpenModal();
				}}
			/>
		</ModalStyle>
	);
};

export default EditProfileModal;

const EPWhiteBox = styled(WhiteBox)`
	justify-content: center;

	> div:first-of-type {
		width: 100%;
		margin-bottom: 46px;
	}
`;

const EPH2 = styled(H2)`
	// Tablet
	@media screen and (max-width: 980px) {
		font-size: 24px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 20px;
	}
`;

const Input = styled.input`
	margin-bottom: 15px;
	padding: 8px 15px;
	width: 100%;
	border: 1px solid ${(props) => props.theme.colors.gray400};
	border-radius: ${(props) => props.theme.radius.smallRadius};
	:focus {
		/* border: 1.5px solid ${(props) => props.theme.colors.gray600}; */
		/* border: 1.8px solid ${(props) => props.theme.colors.purple}; */
		/* box-shadow: ${(props) => props.theme.colors.gray400} 0px 0px 5px 1px; */
		background-color: ${(props) => props.theme.colors.gray50};
	}
`;

const Error = styled.div`
	text-align: center;
	font-size: ${(props) => props.theme.fontSize.small};
	color: #ff3838;
`;

const ButtonWrapper = styled.div`
	width: 100%;

	button {
		width: 47%;
		padding: 8px 0;
		border-radius: ${(props) => props.theme.radius.smallRadius};
		transition: 0.1s;
	}
`;

const SaveButton = styled.button`
	margin-right: 6%;
	background-color: ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};

	:hover {
		background-color: #3f0ba9;
	}
`;

const CancelButton = styled.button`
	border: 1.5px solid ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.purple};

	:hover {
		background-color: #f0e9ff;
	}
`;
