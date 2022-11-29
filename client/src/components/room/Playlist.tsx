import styled from 'styled-components';
import { FcMusic } from 'react-icons/fc';
import { BsPlayCircle, BsVolumeDownFill } from 'react-icons/bs';
import { IoPlayForward, IoPlayBack } from 'react-icons/io5';
import { TbPlayerPause } from 'react-icons/tb';
import { GoMute } from 'react-icons/go';
import YouTube, { YouTubeProps } from 'react-youtube';
import Loading from '../common/Loading';
import { useEffect, useRef, useState } from 'react';

// import ReactPlayer from 'react-player/youtube';

const PlaylistSection = styled.div`
	width: 230px;
	height: 360px;
	background-color: ${(props) => props.theme.colors.white};
	margin-right: 20px;
	margin-bottom: 40px;
	border-radius: ${(props) => props.theme.radius.largeRadius}
		${(props) => props.theme.radius.largeRadius} 0px 0px;
	box-shadow: 0px 5px 5px 0px ${(props) => props.theme.colors.gray500};

	@media screen and (max-width: 640px) {
		height: 240px;
		display: flex;
		flex-direction: column;
		margin-left: 20px;
		border-radius: ${(props) => props.theme.radius.largeRadius};
		box-shadow: none;
	}
`;

const ThumbnailContainer = styled.div`
	background-size: 230px 180px;
	overflow: hidden;
	border-radius: ${(props) => props.theme.radius.largeRadius}
		${(props) => props.theme.radius.largeRadius} 0px 0px;
	height: 180px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	/* img {
		width: 100%;
		height: 100%;
		object-fit: none;
	} */
	@media screen and (max-width: 640px) {
		height: 120px;
	}
`;

const MusicContainer = styled.div`
	height: 180px;
	border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
	padding: 10px;
	overflow-y: scroll;

	::-webkit-scrollbar {
		display: none;
	}
	:hover {
		::-webkit-scrollbar {
			display: block;
			width: 8px;
		}

		::-webkit-scrollbar-thumb {
			height: 30%;
			background-color: ${(props) => props.theme.colors.gray300};

			border-radius: 10px;
		}

		::-webkit-scrollbar-track {
			background: rgba(33, 122, 244, 0.1);
			border-radius: 10px;
		}
	}
	.music_logo {
		margin-right: 5px;
	}
	@media screen and (max-width: 640px) {
		height: 100px;
	}
`;

const MusicElement = styled.div`
	display: flex;
	align-items: center;
	margin: 5px;
	padding-bottom: 5px;
	/* white-space: nowrap; */
	line-height: 16px;
	font-size: ${(props) => props.theme.fontSize.xSmall};
	border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
`;

const OptionContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: ${(props) => props.theme.colors.white};
	height: 60px;
	border-radius: 0px 0px 10px 10px;
	box-shadow: 0px 5px 5px 0px ${(props) => props.theme.colors.gray500};
`;

const OptionBtn = styled.button`
	font-size: ${(props) => props.theme.fontSize.large};

	.option_btn {
		:hover {
			transform: scale(1.1);
		}
		margin-left: 20px;
	}
`;

const PlaylistPart = ({ playlist }) => {
	// const [playlist, setPlaylist] = useState<PlayListInfoProps[]>([]);
	// const [videoId, setVideoId] = useState<string>('');
	// const [play, setPlay] = useState(false);
	// const params = useParams();
	// const roomId = params.id;

	// useEffect(() => {
	// 	getRoomById(roomId)
	// 		.then((res) =>
	// 			setPlaylist(res.data.playlistResponseDto.playlistItems),
	// 		)
	// 		.then(() => {
	// 			setThumbnail(playlist[0].thumbnail);
	// 			setVideoId(playlist[0].videoId);
	// 		})
	// 		.catch((err) => console.log(err));
	// }, []);
	const [player, setPlayer] = useState<any>(null);
	const [play, setPlay] = useState<boolean>(true);
	const [playlistIdList, setPlaylistIdList] = useState<string[]>([]);
	const [isMute, setIsMute] = useState<boolean>(false);

	const opts: YouTubeProps['opts'] = {
		height: '0',
		width: '0',
		playerVars: {
			autoplay: 1,
		},
	};
	const onReady = (event) => {
		// access to player in all event handlers via event.target
		setPlayer(event.target);

		event.target.loadPlaylist({ playlist: playlistIdList, startSeconds: 1 });
		event.target.playVideo();
		// console.log('플리 리스트', playlistIdList);
	};

	const pause = () => {
		if (player) {
			player.pauseVideo();
			setPlay(false);
		}
	};

	const start = () => {
		if (player) {
			player.playVideo();
			// player.cuePlaylist(playlistIdList);
			setPlay(true);
		}
	};

	const next = () => {
		if (player) {
			player.nextVideo();
			setPlay(true);
		}
	};

	const previous = () => {
		if (player) {
			player.previousVideo();
			setPlay(true);
		}
	};

	const mute = () => {
		if (player) {
			player.mute();
			setIsMute(true);
		}
	};

	const unMute = () => {
		if (player) {
			player.unMute();
			setIsMute(false);
		}
	};

	useEffect(() => {
		playlist.map((e) => setPlaylistIdList((prev) => [...prev, e.videoId]));
	}, [playlist]);

	// if (player) {
	// 	player.loadPlaylist(playlistIdList);
	// 	console.log('렌더링 되고있음');
	// }

	// useEffect(() => {
	// 	if (playlistIdList.length !== 0) {
	// 		player.loadPlaylist(playlistIdList);
	// 		console.log('h');
	// 	} else {
	// 		return;
	// 	}
	// }, playlistIdList);

	return (
		<PlaylistSection>
			<ThumbnailContainer>
				{playlist.length === 0 ? (
					<Loading />
				) : (
					<img src={playlist[0].thumbnail} alt="thumbnail"></img>
				)}
			</ThumbnailContainer>
			<MusicContainer>
				{playlist.map((e, index) => {
					return (
						<MusicElement key={index}>
							<span>
								<FcMusic className="music_logo" />
							</span>
							{e.title}
						</MusicElement>
					);
				})}
			</MusicContainer>
			<OptionContainer>
				<OptionBtn>
					<IoPlayBack className="option_btn" onClick={previous}></IoPlayBack>
				</OptionBtn>
				<OptionBtn>
					{play ? (
						<TbPlayerPause
							className="option_btn"
							onClick={pause}></TbPlayerPause>
					) : (
						<BsPlayCircle className="option_btn" onClick={start}></BsPlayCircle>
					)}
				</OptionBtn>

				<OptionBtn>
					<IoPlayForward className="option_btn" onClick={next}></IoPlayForward>
				</OptionBtn>
				<OptionBtn>
					{isMute ? (
						<GoMute className="option_btn" onClick={unMute}></GoMute>
					) : (
						<BsVolumeDownFill
							className="option_btn"
							onClick={mute}></BsVolumeDownFill>
					)}
				</OptionBtn>
				{playlist.length === 0 ? (
					<Loading />
				) : (
					<>
						<YouTube
							videoId={playlist[0].videoId}
							opts={opts}
							onReady={onReady}
						/>
					</>
				)}
			</OptionContainer>
		</PlaylistSection>
	);
};

export default PlaylistPart;
