import styled from 'styled-components';
import { PlayListInfoProps } from '../../pages/PlayListDetail';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import arrowCursor from '../../assets/images/arrowCursor.png';
import { useLocation } from 'react-router-dom';
import { MdOutlineDeleteForever } from 'react-icons/md';

const MusicList = ({ playListInfo, plList, setPlList }: PlayListInfoProps) => {
	const { pathname } = useLocation();
	//음악 삭제이벤트
	const deletePlayList = (idx: number) => {
		const copyPlList = [...plList];
		copyPlList.splice(idx, 1);
		setPlList(copyPlList);
	};
	//드래그 앤 드랍 결과 저장
	const handleChange = (result) => {
		if (!result.destination) return;
		const items = [...plList];
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setPlList(items);
	};

	return (
		<MusicListStyle>
			{pathname.split('/')[1] === 'playlistdetail' ? (
				playListInfo.playlistItems.map((ele, idx) => (
					<a key={idx} href={ele.url} target="_blank" rel="noreferrer">
						<Music pathname={pathname}>
							<div className="left">
								<span className="thumbnail">
									<img src={ele.thumbnail} alt="썸네일" />
								</span>
								<span className="title">{ele.title}</span>
								<span className="channelTitle">{ele.channelTitle}</span>
							</div>
							<div className="rigth"></div>
						</Music>
					</a>
				))
			) : (
				<DragDropContext onDragEnd={handleChange}>
					<Droppable droppableId="todos">
						{(provided) => (
							<div
								className="todos"
								{...provided.droppableProps}
								ref={provided.innerRef}>
								{plList &&
									plList.map(
										({ videoId, thumbnail, title, channelTitle }, idx) => (
											<Draggable key={videoId} draggableId={title} index={idx}>
												{(provided) => (
													<Music
														pathname={pathname}
														key={idx}
														ref={provided.innerRef}
														{...provided.dragHandleProps}
														{...provided.draggableProps}>
														<div className="left">
															<span className="thumbnail">
																<img src={thumbnail} alt="썸네일" />
															</span>
															<span className="title">{title}</span>
															<span className="channelTitle">
																{channelTitle}
															</span>
														</div>
														<div className="rigth">
															<button
																onClick={() => deletePlayList(idx)}
																className="deleteBtn">
																{/* <RiDeleteBinLine size="24" /> */}
																<MdOutlineDeleteForever />
															</button>
														</div>
													</Music>
												)}
											</Draggable>
										),
									)}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			)}
		</MusicListStyle>
	);
};
// https://www.youtube.com/watch?v=HM4VgB9rfWE
export default MusicList;

const Music = styled.div<{ pathname: string }>`
	padding: 20px;
	display: flex;

	min-width: 300px;
	min-height: 40px;
	background-color: ${(props) => props.theme.colors.white};
	border-bottom: 1px solid ${(props) => props.theme.colors.gray400};

	:hover {
		cursor: ${(props) =>
			props.pathname.split('/')[1] === 'playlistdetail'
				? `pointer`
				: `url(${arrowCursor}) 15 15, grab`};
		/* background-color: ${(props) =>
			props.pathname.split('/')[1] === 'playlistdetail'
				? '#f0f0f0'
				: '#f1eaff'};
		.title {
			color: ${(props) =>
			props.pathname.split('/')[1] === 'playlistdetail' &&
			props.theme.colors.purple}; */
		background-color: ${(props) => props.theme.colors.gray100};
		.title {
			color: ${(props) => props.theme.colors.purple};
		}
	}
	img {
		width: 100%;
		margin-right: 2%;
	}
	span {
		margin-right: 2%;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-all;
	}
	.left {
		flex: 9.7;
		display: flex;
		align-items: center;
	}
	.rigth {
		flex: 0.3;
		display: flex;
		align-items: center;
	}
	.thumbnail {
		flex: 0.7;
		@media (max-width: 640px) {
			flex: 2;
		}
	}
	.title {
		flex: 7.3;
		line-height: 1.3;
		height: 1.3em;
		@media (max-width: 640px) {
			flex: 6;
		}
	}
	.channelTitle {
		flex: 2;
		line-height: 1.3;
		height: 1.3em;
		font-size: ${(props) => props.theme.fontSize.small};
		color: ${(props) => props.theme.colors.gray600};
	}

	.deleteBtn {
		color: ${(props) => props.theme.colors.gray500};
		font-weight: 100;
		font-size: 24px;
		:hover {
			cursor: pointer;
			color: ${(props) => props.theme.colors.purple};
		}
	}
`;

const MusicListStyle = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow: 1px 1px 10px #4d0bd133;
	margin-bottom: 80px;
	border-radius: ${(props) => props.theme.radius.smallRadius};

	${Music}:nth-of-type(1) {
		border-top-left-radius: ${(props) => props.theme.radius.smallRadius};
		border-top-right-radius: ${(props) => props.theme.radius.smallRadius};
	}

	${Music}:last-of-type {
		border-bottom-left-radius: ${(props) => props.theme.radius.smallRadius};
		border-bottom-right-radius: ${(props) => props.theme.radius.smallRadius};
	}
`;
