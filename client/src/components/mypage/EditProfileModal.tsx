import styled from 'styled-components';
import { ModalBackdrop, ModalStyle, WhiteBox } from '../home/LoginModal';
import { useEffect, useState } from 'react';
import { editUserInfo } from '../../api/userApi';
import { useDispatch } from 'react-redux';
import { myInfo } from '../../slices/mySlice';
import ErrorMessage from '../common/ErrorMessage';

type EditProfileModalType = {
	handleOpenModal: () => void;
	memberId: number;
	myName: string;
	myIntro: string;
};

const EditProfileModal = ({
	handleOpenModal,
	memberId,
	myName,
	myIntro,
}: EditProfileModalType) => {
	const dispatch = useDispatch();

	const [changeName, setChangeName] = useState(myName);
	const [changeIntro, setChangeIntro] = useState(myIntro || '');
	const [nicknameError, setNicknameError] = useState('');
	const [introError, setIntroError] = useState('');

	const onSubmit = () => {
		setNicknameError('');
		setIntroError('');

		if (!changeName) {
			setNicknameError('닉네임을 입력해주세요');
			return;
		}
		if (changeName.length > 10) {
			setNicknameError('닉네임은 10자 이하여야 합니다');
			return;
		}
		if (changeIntro.length > 30) {
			setIntroError('자기소개는 30자 이하여야 합니다');
			return;
		}
		if (myName === changeName && myIntro === changeIntro) {
			handleOpenModal();
			return;
		}

		editUserInfo(memberId, changeName, changeIntro).then((res) => {
			if (res.response && res.response.status === 402) {
				setNicknameError('중복된 닉네임입니다');
				return;
			} else {
				dispatch(myInfo(res.data));

				handleOpenModal();
			}
		});
	};

	// 모달 오픈시 스크롤 막기
	useEffect(() => {
		document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100vw`;
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.cssText = '';
			window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
		};
	}, []);

	return (
		<ModalStyle>
			<EPWhiteBox>
				<div>
					<H3>
						닉네임 <span>10자 이하</span>
					</H3>
					<Input
						value={changeName}
						onChange={(e) => {
							setChangeName(e.target.value);
						}}
						autoFocus
						placeholder="등록된 닉네임이 없습니다"
						className={nicknameError ? 'error' : ''}
					/>
					{nicknameError && (
						<ErrorMessage margin="15px 0 0 0" center text={nicknameError} />
					)}
				</div>
				<div>
					<H3>
						자기소개 <span>30자 이하</span>
					</H3>
					<Input
						value={changeIntro}
						onChange={(e) => {
							setChangeIntro(e.target.value);
						}}
						placeholder="등록된 자기소개가 없습니다"
						className={introError ? 'error' : ''}
					/>
					{introError && (
						<ErrorMessage margin="15px 0 0 0" center text={introError} />
					)}
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
			<ModalBackdrop
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

	> div:nth-of-type(1),
	> div:nth-of-type(2) {
		width: 100%;
		margin-bottom: 25px;
	}
`;

const H3 = styled.h3`
	font-size: ${(props) => props.theme.fontSize.medium};
	font-weight: 600;
	margin-bottom: 15px;

	span {
		margin-left: 3px;
		color: ${(props) => props.theme.colors.gray500};
		font-size: ${(props) => props.theme.fontSize.small};
	}
`;

const Input = styled.input`
	padding: 8px 15px;
	width: 100%;
	border: 1px solid ${(props) => props.theme.colors.gray400};
	border-radius: ${(props) => props.theme.radius.smallRadius};
	&.error {
		background-color: #ff38381c;
	}
	:focus {
		background-color: ${(props) => props.theme.colors.gray50};
	}
`;

export const Error = styled.div`
	margin-top: 15px;
	text-align: center;
	font-size: ${(props) => props.theme.fontSize.small};
	color: #ff3838;
`;

const ButtonWrapper = styled.div`
	width: 100%;
	margin-top: 10px;
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
	border: 1.5px solid ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};

	:hover {
		opacity: 0.85;
	}
`;

const CancelButton = styled.button`
	border: 1.5px solid ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.purple};

	:hover {
		opacity: 0.75;
	}
`;
