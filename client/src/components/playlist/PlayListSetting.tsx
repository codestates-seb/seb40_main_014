import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { DefaultButton } from '../common/Button';
import Toggle from '../common/Toggle';

type Props = {
	setPlTitle?: Dispatch<SetStateAction<string>>;
	setPlCategory?: Dispatch<SetStateAction<string>>;
};

const PlayListSetting = ({ setPlTitle, setPlCategory }: Props) => {
	return (
		<PlayListSettingStyle>
			<div>플레이리스트 제목</div>
			<div className="row">
				<div className="left">
					<input onChange={(e) => setPlTitle(e.target.value)} />
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
					<input onChange={(e) => setPlCategory(e.target.value)} />
				</div>
				<div className="rigth"></div>
			</div>
			<div>URL입력</div>
			<div className="row">
				<div className="left">
					<input />
				</div>
				<div className="rigth">
					<DefaultButton>추가</DefaultButton>
				</div>
			</div>
		</PlayListSettingStyle>
	);
};

export default PlayListSetting;

const PlayListSettingStyle = styled.div`
	div {
		font-size: ${(props) => props.theme.fontSize.medium};
		font-weight: 700;
		margin: 10px 0;
	}
	.row {
		display: flex;
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
	}
	.rigth {
		flex: 3;
		display: flex;
		align-items: center;
		font-weight: 400;
	}
`;
