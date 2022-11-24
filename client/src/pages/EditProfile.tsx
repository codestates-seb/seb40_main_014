import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { editUserInfox } from '../api/userApi';
import { myInfo, myValue } from '../slices/mySlice';

const EditProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const inputRef = useRef<HTMLInputElement>(null);

	const { memberId, picture, name } = useSelector(myValue);

	const [myPicture, setMyPicture] = useState({
		imageFile: null,
		imageUrl: picture,
	});
	const [myName, setMyName] = useState(name);

	useEffect(() => {
		console.log('myPicture', myPicture);
		console.log('myName', myName);
	}, [myPicture, myName]);

	// 프로필 사진 선택
	const changeImage = (e) => {
		e.preventDefault();

		const fileReader = new FileReader();

		if (e.target.files[0]) {
			fileReader.readAsDataURL(e.target.files[0]);
		}

		fileReader.onload = () => {
			setMyPicture({
				imageFile: e.target.files[0],
				imageUrl: fileReader.result as string,
			});
		};
	};

	// 프로필 사진 초기화
	const deleteImage = () => {
		setMyPicture({
			imageFile: null,
			imageUrl: picture,
		});
	};

	const onSubmit = () => {
		if (myPicture.imageFile || myName !== name) {
			const formData = new FormData();
			formData.append('name', myName);
			formData.append('picture', myPicture.imageFile);

			console.log('formData', formData);

			editUserInfox(memberId, formData).then((res) => {
				console.log('editProfile res', res);

				dispatch(myInfo(res.data));

				navigate(`/mypage/${memberId}`);
			});
		} else {
			alert('변경사항이 없습니다.');
		}
	};

	return (
		<Wrapper>
			<PreviewImage src={myPicture.imageUrl} alt="profile" />
			<InputImage
				type="file"
				accept="image/*"
				onChange={changeImage}
				ref={inputRef}
			/>
			<div className="button-wrapper">
				<button onClick={() => inputRef.current.click()}>선택</button>
				<button onClick={deleteImage}>초기화</button>
			</div>
			<Name>
				닉네임
				<input
					type="text"
					value={myName}
					onChange={(e) => {
						setMyName(e.target.value);
					}}
				/>
			</Name>
			<div className="button-wrapper">
				<button onClick={onSubmit}>등록</button>
				<button onClick={() => navigate(`/mypage/${memberId}`)}>취소</button>
			</div>
		</Wrapper>
	);
};

export default EditProfile;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 60px 0;

	.button-wrapper {
		:first-of-type {
			margin-bottom: 50px;

			button {
				width: 50px;
				padding: 6px 0;
				font-size: ${(props) => props.theme.fontSize.small};
				color: ${(props) => props.theme.colors.purple};
				border-bottom: 1px solid ${(props) => props.theme.colors.purple};
				:first-of-type {
					margin-right: 30px;
				}
			}
		}

		:last-of-type {
			button {
				width: 200px;
				padding: 10px 0;
				border-radius: ${(props) => props.theme.radius.smallRadius};
				transition: 0.1s;
				:first-of-type {
					color: ${(props) => props.theme.colors.white};
					background-color: ${(props) => props.theme.colors.purple};
					margin-right: 30px;
					:hover {
						background-color: #410bae;
					}
				}
				:last-of-type {
					color: ${(props) => props.theme.colors.purple};
					background-color: ${(props) => props.theme.colors.white};
					border: 1px solid ${(props) => props.theme.colors.purple};
					:hover {
						background-color: ${(props) => props.theme.colors.gray50};
					}
				}
			}
			// Mobile
			@media screen and (max-width: 640px) {
				width: 100%;
				display: flex;
				justify-content: space-between;
				button {
					width: 45%;
					:first-of-type {
						margin-right: 0;
					}
				}
			}
		}
	}
`;

const PreviewImage = styled.img`
	width: 190px;
	height: 190px;
	border-radius: 50%;
	margin-bottom: 25px;

	// Tablet
	@media screen and (max-width: 980px) {
		width: 170px;
		height: 170px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		width: 120px;
		height: 120px;
	}
`;

const InputImage = styled.input`
	display: none;
`;

const Name = styled.div`
	margin-bottom: 100px;

	input {
		margin-left: 20px;
		padding: 7px 10px;
		width: 250px;
		border: 1px solid ${(props) => props.theme.colors.gray400};
		border-radius: ${(props) => props.theme.radius.smallRadius};
		:focus {
			box-shadow: ${(props) => props.theme.colors.lightPurple} 0px 0px 5px 1px;
		}
	}

	// Mobile
	@media screen and (max-width: 640px) {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		input {
			margin-left: 15px;
			width: 80%;
		}
	}
`;
