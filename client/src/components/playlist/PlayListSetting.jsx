import styled from 'styled-components';
import { DefaultButton } from '../common/Button';
import Toggle from '../common/Toggle';

const PlayListSetting = ({ changeTitle, changeCategory }) => {
	return (
		<PlayListSettingStyle>
			<div>플레이 리트 제목</div>
			<div className="row">
				<div className="left">
					<input onChange={changeTitle} />
				</div>
				<div className="rigth">
					공개
					<Toggle />
					비공개
				</div>
			</div>
			<div>카테고리</div>
			<div className="row">
				<div className="left">
					<input onChange={changeCategory} />
				</div>
				<div className="rigth"></div>
			</div>
			<div>URL입력</div>
			<div className="row">
				<div className="left">
					<input />
				</div>
				<div className="rigth">
					<DefaultButton fontSize="var(--medium)">추가</DefaultButton>
				</div>
			</div>
		</PlayListSettingStyle>
	);
};

export default PlayListSetting;

const PlayListSettingStyle = styled.div`
	div {
		font-size: ${(props) => props.theme.fontSize.medium};
		margin: 10px 0;
	}
	.row {
		display: flex;
	}
	.left {
		flex: 7;
		input {
			width: 95%;
			height: 40px;
			border: 1px solid gray;
			border-radius: ${(props) => props.theme.radius.largeRadius};
		}
	}
	.rigth {
		flex: 3;
		display: flex;
		align-items: center;
	}
`;
