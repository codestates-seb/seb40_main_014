import styled from 'styled-components';
import { FcMusic } from 'react-icons/fc';
import { BsPlayCircle, BsVolumeDownFill } from 'react-icons/bs';
import { IoPlayForward, IoPlayBack } from 'react-icons/io5';
import { TbPlayerPause } from 'react-icons/tb';
import { GoMute } from 'react-icons/go';
import YouTube, { YouTubeProps } from 'react-youtube';
import Loading from '../common/Loading';
import { useEffect, useState } from 'react';
import playSvg from '../../assets/images/play.json';
import Lottie from 'lottie-react';
import { YouTubePlayerProps } from 'react-player/youtube';

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
		width: 100%;
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

			border-radius: ${(props) => props.theme.radius.largeRadius};
		}

		::-webkit-scrollbar-track {
			background: rgba(33, 122, 244, 0.1);
			border-radius: ${(props) => props.theme.radius.largeRadius};
		}
	}
	.music_logo {
		margin-right: 5px;
	}
	@media screen and (max-width: 640px) {
		height: 100px;
		width: 100%;
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
	font-size: ${(props) => props.theme.fontSize.xLarge};

	.option_btn {
		margin-left: 20px;
		:hover {
			transform: scale(1.1);
		}
	}
	.pause {
		color: blue;
	}
	.start {
		color: red;
	}
`;

const LottieContainer = styled.span`
	div {
		width: 24px;
		height: 24px;
	}
`;

const PlaylistPart = ({ playlist }) => {
	const [player, setPlayer] = useState<YouTubePlayerProps>(null);
	const [play, setPlay] = useState<boolean>(false);
	const [playlistIdList, setPlaylistIdList] = useState<string[]>([]);
	const [isMute, setIsMute] = useState<boolean>(false);
	const [nowVideo, setNowVideo] = useState('');

	const opts: YouTubeProps['opts'] = {
		height: '1',
		width: '1',
		// playerVars: {
		// 	autoplay: 1,
		// },
	};
	const onReady = (event) => {
		// access to player in all event handlers via event.target
		setPlayer(event.target);

		// event.target.loadPlaylist({ playlist: playlistIdList, startSeconds: 1 });
		event.target.cuePlaylist({ playlist: playlistIdList, startSeconds: 1 });
		// event.target.playVideo();
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
			setPlay(true);
		}
	};

	const next = () => {
		if (player) {
			player.nextVideo();
			player.seekTo(1);
			setPlay(true);
		}
	};

	const previous = () => {
		if (player) {
			player.previousVideo();
			player.seekTo(1);
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

	const onPlay = () => {
		setNowVideo(player.getVideoData().video_id);
	};

	useEffect(() => {
		playlist.map((e) => setPlaylistIdList((prev) => [...prev, e.videoId]));
	}, [playlist]);

	return (
		<PlaylistSection>
			<ThumbnailContainer>
				{playlist.length === 0 ? (
					<Loading />
				) : (
					<img src={playlist[0].thumbnail} alt="썸네일"></img>
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
							{e.videoId === nowVideo && (
								<LottieContainer>
									<Lottie animationData={playSvg} loop={true} />
								</LottieContainer>
							)}
						</MusicElement>
					);
				})}
			</MusicContainer>
			<OptionContainer>
				<OptionBtn>
					<IoPlayBack
						className="option_btn backward"
						onClick={previous}></IoPlayBack>
				</OptionBtn>
				<OptionBtn>
					{play ? (
						<TbPlayerPause
							className="option_btn pause"
							onClick={pause}></TbPlayerPause>
					) : (
						<BsPlayCircle
							className="option_btn start"
							onClick={start}></BsPlayCircle>
					)}
				</OptionBtn>

				<OptionBtn>
					<IoPlayForward
						className="option_btn forward"
						onClick={next}></IoPlayForward>
				</OptionBtn>
				<OptionBtn>
					{isMute ? (
						<GoMute className="option_btn pause" onClick={unMute}></GoMute>
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
						<Test>
							<YouTube
								videoId={playlist[0].videoId}
								opts={opts}
								onReady={onReady}
								onPlay={onPlay}
							/>
						</Test>
					</>
				)}
			</OptionContainer>
		</PlaylistSection>
	);
};

export default PlaylistPart;

const Test = styled.div`
	visibility: hidden;
`;
