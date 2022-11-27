import styled from 'styled-components';
import { FcMusic } from 'react-icons/fc';
import { BsPlayCircle, BsVolumeDownFill } from 'react-icons/bs';
import { IoPlayForward, IoPlayBack } from 'react-icons/io5';
import YouTube from 'react-youtube';
import Loading from '../common/Loading';

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
	/* img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	} */
	img {
		width: 100%;
		height: 100%;
		object-fit: none;
	}
	@media screen and (max-width: 640px) {
		height: 120px;
	}
`;

const MusicContainer = styled.div`
	height: 180px;
	border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
	padding: 10px;
	overflow-y: scroll;

	:hover {
		::-webkit-scrollbar {
			width: 8px;
		}

		::-webkit-scrollbar-thumb {
			height: 30%;
			background: ${(props) => props.theme.colors.gray300};
			border-radius: 10px;
		}

		::-webkit-scrollbar-track {
			background: rgba(33, 122, 244, 0.1);
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

	const opts = {
		height: '0',
		width: '0',
		playerVars: {
			autoplay: 1,
		},
	};
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
					<IoPlayBack className="option_btn"></IoPlayBack>
				</OptionBtn>
				<OptionBtn>
					<BsPlayCircle className="option_btn"></BsPlayCircle>
				</OptionBtn>

				<OptionBtn>
					<IoPlayForward className="option_btn"></IoPlayForward>
				</OptionBtn>
				<OptionBtn>
					<BsVolumeDownFill className="option_btn"></BsVolumeDownFill>
				</OptionBtn>
				{playlist.length === 0 ? (
					<Loading />
				) : (
					<YouTube videoId={playlist[0].videoId} opts={opts} />
				)}
			</OptionContainer>
		</PlaylistSection>
	);
};

export default PlaylistPart;
