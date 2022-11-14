import styled from 'styled-components';
import { MusicListProps } from '../../types/types';

const MusicList = ({ musicList }: MusicListProps) => {
	return (
		<MusicListStyle>
			{musicList &&
				musicList.map((ele, idx) => {
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
const Music = styled.div<{ color: any }>`
	border: 1px solid blue;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	min-width: 500px;
	min-height: 40px;
	background-color: ${(props) => (props.color % 2 === 0 ? `blue` : `red`)};
`;
