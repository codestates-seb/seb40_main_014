import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { getYouTubeMusic } from '../../api/youtubeApi';
import { musicInfoType } from '../../pages/MakePlayList';
import { DefaultButton } from '../common/Button';
import Toggle from '../common/Toggle';
import { AiFillYoutube } from 'react-icons/ai';
import Category from '../common/Category';
import ErrorMessage from '../common/ErrorMessage';
import Swal from 'sweetalert2';

type Props = {
	setPlTitle: Dispatch<SetStateAction<string>>;
	plTitle: string;
	setPlList: Dispatch<SetStateAction<Array<musicInfoType>>>;
	plList: Array<musicInfoType>;
	setCategoryList: Dispatch<SetStateAction<Array<string>>>;
	categoryList: Array<string>;
	setStatus: Dispatch<SetStateAction<boolean>>;
	status: boolean;
	titleError: string;
	categoryError: string;
	playlistError: string;
	setPlaylistError: Dispatch<SetStateAction<string>>;
};

const PlayListSetting = ({
	setPlTitle,
	plTitle,
	setPlList,
	plList,
	setCategoryList,
	categoryList,
	setStatus,
	status,
	titleError,
	categoryError,
	playlistError,
	setPlaylistError,
}: Props) => {
	const [url, setUrl] = useState('');
	const [playlistDetailError, setPlaylistDetailError] = useState('');

	const addPlList = () => {
		setPlaylistDetailError('');
		setPlaylistError('');

		if (plList.length >= 10) {
			return setPlaylistError('동영상은 10개 이상 추가할 수 없습니다.');
		}
		let videoId = getVideoId(url);
		const musicInfo: musicInfoType = {};

		//중복 체크
		plList &&
			plList.map((ele) => {
				if (ele.videoId === videoId) videoId = 'overlap';
			});
		if (videoId !== 'none') {
			if (videoId === 'overlap') {
				return setPlaylistDetailError('이미 추가된 동영상 입니다.');
			}
			//유튜브 데이터 들고오기
			let result = false;
			getYouTubeMusic(videoId)
				.then((res) => {
					if (res.items[0]?.snippet) {
						result = true;
						musicInfo.videoId = videoId;
						musicInfo.url = url;
						musicInfo.channelTitle = res.items[0].snippet.channelTitle;
						musicInfo.title = res.items[0].snippet.title;
						if (res.items[0].snippet.thumbnails.maxres) {
							musicInfo.thumbnail = res.items[0].snippet.thumbnails.maxres.url;
						} else {
							musicInfo.thumbnail = res.items[0].snippet.thumbnails.medium.url;
						}
					} else {
						return setPlaylistDetailError('찾으시는 곡의 정보가 없습니다.');
					}
				})
				.then(() => {
					if (result) {
						setPlList((prev) => [...prev, musicInfo]);
						setUrl('');
					}
				});
		}
	};

	const getVideoId = (url: string) => {
		if (url.indexOf('/watch') > -1) {
			const arr = url.replaceAll(/=|&/g, '?').split('?');
			return arr[arr.indexOf('v') + 1];
		} else if (url.indexOf('/youtu.be') > -1) {
			const arr = url.replaceAll(/=|&|\//g, '?').split('?');
			return arr[arr.indexOf('youtu.be') + 1];
		} else {
			setPlaylistDetailError('URL형식이 올바르지 않습니다.');
			return 'none';
		}
	};

	const addCategory = (value: string) => {
		if (value !== '') {
			const category = value;
			if (categoryList.length <= 2 && !categoryList.includes(category)) {
				setCategoryList((prev) => [...prev, category]);
			} else if (categoryList.length === 3) {
				Swal.fire({
					icon: 'warning',
					text: '카테고리는 3개 이상 넣을 수 없습니다.',
				});
			}
		}
	};

	const deleteCategory = (idx: number) => {
		const copyCategory = [...categoryList];
		copyCategory.splice(idx, 1);
		setCategoryList(copyCategory);
	};

	return (
		<PlayListSettingStyle>
			<Title>플레이리스트 제목</Title>
			<div className="row">
				<div>
					<div className="left">
						<input
							className={titleError ? 'error' : ''}
							value={plTitle}
							onChange={(e) => setPlTitle(e.target.value)}
							maxLength={20}
							// eslint-disable-next-line jsx-a11y/no-autofocus
							autoFocus
						/>
					</div>
					<div className="rigth toggle">
						공개
						<Toggle setState={setStatus} state={status} />
						비공개
					</div>
				</div>
				{titleError && <ErrorMessage text={titleError} />}
			</div>
			<Title>카테고리 (최대 3개)</Title>
			<div className="row">
				<div>
					<div className="left">
						<select
							className={categoryError ? 'error' : ''}
							onChange={(e) => addCategory(e.target.value)}>
							<option value="">선택</option>
							<option value="발라드">발라드</option>
							<option value="댄스">댄스</option>
							<option value="힙합">힙합</option>
							<option value="알앤비">알앤비</option>
							<option value="인디">인디</option>
							<option value="록">록</option>
							<option value="트로트">트로트</option>
							<option value="POP">POP</option>
							<option value="OST">OST</option>
						</select>
						<div className="categorybtn">
							{categoryList &&
								categoryList.map((ele, idx) => {
									return (
										<div key={idx}>
											<Category category={ele} margin="0 5px 0 0">
												{ele}
											</Category>
											<button
												className="deleteCategory"
												onClick={() => deleteCategory(idx)}>
												x
											</button>
										</div>
									);
								})}
						</div>
					</div>
					<div className="rigth"></div>
				</div>
				{categoryError && <ErrorMessage text={categoryError} />}
			</div>
			<Title>
				<a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
					<AiFillYoutube color="red" size="30" /> <span>YouTube</span>
				</a>
				URL 입력
			</Title>
			<div className="row">
				<div>
					<div className="left">
						<input
							className={playlistDetailError || playlistError ? 'error' : ''}
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							placeholder="Ex) https://www.youtube.com/watch?v=Er0jdfJZzzk"
						/>
					</div>
					<div className="rigth">
						<DefaultButton height="38px" mobileWidth onClick={addPlList}>
							추가
						</DefaultButton>
					</div>
				</div>
				{playlistDetailError && <ErrorMessage text={playlistDetailError} />}
				{playlistError && <ErrorMessage text={playlistError} />}
			</div>
		</PlayListSettingStyle>
	);
};

export default PlayListSetting;

const PlayListSettingStyle = styled.div`
	.row {
		margin-bottom: 40px;
	}
	.row > div:first-of-type {
		display: flex;

		@media (max-width: 640px) {
			flex-direction: column;
		}
	}

	.left {
		flex: 7;
		input {
			padding: 20px;
			width: 95%;
			height: 40px;
			border: 1px solid ${(props) => props.theme.colors.gray400};
			border-radius: ${(props) => props.theme.radius.smallRadius};
			// Mobile
			@media screen and (max-width: 640px) {
				width: 100%;
				margin-bottom: 20px;
			}
		}
		select {
			padding: 10px;
			width: 200px;
			font-size: ${(props) => props.theme.fontSize.medium};
			border: 1px solid ${(props) => props.theme.colors.gray400};
			border-radius: ${(props) => props.theme.radius.smallRadius};
			margin-bottom: 10px;
		}
		.error {
			box-shadow: 0 0 10px #ff383864;
		}
	}

	.rigth {
		flex: 3;
		display: flex;
		align-items: center;
	}
	.toggle {
		// Mobile
		@media screen and (max-width: 640px) {
			justify-content: flex-end;
		}
	}

	input {
		:focus-within {
			outline: none;
			border-color: ${(props) => props.theme.colors.lightPurple};
			box-shadow: 0 0 10px ${(props) => props.theme.colors.lightPurple};
		}
	}

	select {
		:focus-within {
			outline: none;
			border-color: ${(props) => props.theme.colors.lightPurple};
			box-shadow: 0 0 10px ${(props) => props.theme.colors.lightPurple};
		}
	}

	.categorybtn {
		display: flex;
		align-items: center;
	}
	.deleteCategory {
		cursor: pointer;
		margin-right: 10px;
	}
`;

const Title = styled.h3`
	display: block;
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	font-size: 18px;
	font-weight: 600;

	a {
		display: flex;
		align-items: center;
		margin-right: 8px;

		span {
			margin-left: 5px;
			color: red;
			font-size: ${(props) => props.theme.fontSize.medium};
		}
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.medium};
	}
`;
