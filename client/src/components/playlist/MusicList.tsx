import styled from 'styled-components';
import { PlayListInfoProps } from '../../pages/PlayListDetail';

export type music = {
	id: number;
	name: string;
};

const MusicList = ({ playListInfo }: PlayListInfoProps) => {
	return (
		<MusicListStyle>
			{playListInfo?.musiclist &&
				playListInfo.musiclist.map((ele, idx) => {
					return (
						<Music key={ele.id} color={idx}>
							{ele.name}
						</Music>
					);
				})}
		</MusicListStyle>
	);
};

export default MusicList;

const Music = styled.div<{ color?: any }>`
	padding: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	min-width: 300px;
	min-height: 40px;
	background-color: ${(props) => props.theme.colors.white};
	border-bottom: 1px solid ${(props) => props.theme.colors.gray400};

	&:hover {
		cursor: pointer;
		background-color: ${(props) => props.theme.colors.lightPurple};
	}
`;

const MusicListStyle = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow: 1px 1px 10px #4d0bd133;
	margin-top: 2%;
	margin-bottom: 5%;
	border-radius: ${(props) => props.theme.radius.largeRadius};

	${Music}:nth-of-type(1) {
		border-top-left-radius: ${(props) => props.theme.radius.largeRadius};
		border-top-right-radius: ${(props) => props.theme.radius.largeRadius};
	}

	${Music}:last-of-type {
		border-bottom-left-radius: ${(props) => props.theme.radius.largeRadius};
		border-bottom-right-radius: ${(props) => props.theme.radius.largeRadius};
	}
`;
