import styled from 'styled-components';
import { PlayListInfoProps } from '../../pages/PlayListDetail';

export type music = {
	id: number;
	name: string;
};

const MusicList = (props: PlayListInfoProps) => {
	return (
		<MusicListStyle>
			{props.playListInfo?.musiclist &&
				props.playListInfo.musiclist.map((ele, idx) => {
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

const MusicListStyle = styled.div`
	display: flex;
	flex-direction: column;
`;
const Music = styled.div<{ color?: any }>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	min-width: 500px;
	min-height: 40px;
	background-color: ${(props) =>
		props.color % 2 === 0
			? props.theme.colors.gray200
			: props.theme.colors.white};
`;
