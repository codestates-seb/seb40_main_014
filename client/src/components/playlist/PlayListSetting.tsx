import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { getYouTubeMusic } from '../../api/youtubeApi';
import { musicInfoType } from '../../pages/MakePlayList';
import { DefaultButton } from '../common/Button';
import Toggle from '../common/Toggle';
import { AiFillYoutube } from 'react-icons/ai';
import Category from '../common/Category';

type Props = {
	setPlTitle: Dispatch<SetStateAction<string>>;
	plTitle: string;
	setPlList: Dispatch<SetStateAction<Array<musicInfoType>>>;
	plList: Array<musicInfoType>;
	setCategoryList: Dispatch<SetStateAction<Array<string>>>;
	categoryList: Array<string>;
	setStatus: Dispatch<SetStateAction<boolean>>;
	status: boolean;
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
}: Props) => {
	const [url, setUrl] = useState('');

	const addPlList = () => {
		let vedioId = getVedioId(url);
		const musicInfo: musicInfoType = {};

		//중복 체크
		plList &&
			plList.map((ele) => {
				if (ele.vedioId === vedioId) vedioId = 'overlap';
			});
		if (vedioId !== 'none') {
			if (vedioId === 'overlap') {
				return alert('이미 추가된 동영상 입니다.');
			}
			//유튜브 데이터 들고오기
			getYouTubeMusic(vedioId)
				.then((res) => {
					musicInfo.vedioId = vedioId;
					musicInfo.url = url;
					musicInfo.channelTitle = res.channelTitle;
					musicInfo.title = res.title;
					musicInfo.thumbnail = res.thumbnails.high.url;
				})
				.then(() => {
					setPlList((prev) => [...prev, musicInfo]);
					setUrl('');
				});
		}
	};

	const getVedioId = (url: string) => {
		if (url.indexOf('/watch') > -1 && url.indexOf('&') === -1) {
			return url.split('?')[1].replace('v=', '');
		} else if (url.indexOf('/youtu.be') > -1) {
			return url.split('/youtu.be/')[1];
		} else {
			alert('URL형식이 다릅니다.');
			return 'none';
		}
	};

	const addCategory = (value: string) => {
		if (value !== '') {
			const category = value;
			if (categoryList.length <= 5 && !categoryList.includes(category)) {
				setCategoryList((prev) => [...prev, category]);
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
			<div>플레이리스트 제목</div>
			<div className="row">
				<div className="left">
					<input
						value={plTitle}
						onChange={(e) => setPlTitle(e.target.value)}
						maxLength={70}
					/>
				</div>
				<div className="rigth">
					비공개
					<Toggle setState={setStatus} state={status} />
					공개
				</div>
			</div>
			<div>카테고리 (최대 5개)</div>
			<div className="row">
				<div className="left">
					<select onChange={(e) => addCategory(e.target.value)}>
						<option value="">선택</option>
						<option value="발라드">발라드</option>
						<option value="힙합"> 힙합</option>
						<option value="OST">OST</option>
						<option value="재즈">재즈</option>
						<option value="댄스">댄스</option>
					</select>
					<div className="categorybtn">
						{categoryList &&
							categoryList.map((ele, idx) => {
								return (
									<div key={idx}>
										<Category category={ele}>{ele}</Category>
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
			<div className="youtube">
				<AiFillYoutube color="red" size="30" />
				<span>YOUTUBE</span> URL입력
			</div>
			<div className="row">
				<div className="left">
					<input value={url} onChange={(e) => setUrl(e.target.value)} />
				</div>
				<div className="rigth">
					<DefaultButton onClick={addPlList}>추가</DefaultButton>
				</div>
			</div>
		</PlayListSettingStyle>
	);
};

export default PlayListSetting;

const PlayListSettingStyle = styled.div`
	div {
		font-size: ${(props) => props.theme.fontSize.medium};
		font-weight: 600;
		margin: 10px 0;
	}
	.row {
		display: flex;
		@media (max-width: 800px) {
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
		}
		select {
			padding: 10px;
			font-size: ${(props) => props.theme.fontSize.medium};
			border: 1px solid ${(props) => props.theme.colors.gray400};
			border-radius: ${(props) => props.theme.radius.smallRadius};
		}
	}
	.rigth {
		flex: 3;
		display: flex;
		align-items: center;
		font-weight: 400;
	}
	input {
		&:focus-within {
			outline: none;
			border-color: ${(props) => props.theme.colors.lightPurple};
			box-shadow: 0 0 10px ${(props) => props.theme.colors.lightPurple};
		}
	}
	select {
		&:focus-within {
			outline: none;
			border-color: ${(props) => props.theme.colors.lightPurple};
			box-shadow: 0 0 10px ${(props) => props.theme.colors.lightPurple};
		}
	}
	.youtube {
		display: flex;
		align-items: center;
		span {
			color: red;
			margin: 0 0.5%;
		}
	}

	.categorybtn {
		display: flex;
		align-items: center;
	}
	.deleteCategory {
		cursor: pointer;
	}
`;
