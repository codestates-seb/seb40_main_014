import styled from 'styled-components';
import thumbnail from '../../assets/images/thumbnail.png';
import { FcMusic } from 'react-icons/fc';
import { BsPlayCircle, BsVolumeDownFill } from 'react-icons/bs';
import { IoPlayForward, IoPlayBack } from 'react-icons/io5';

const PlaylistSection = styled.div`
	width: 230px;
	height: 360px;
	background-color: ${(props) => props.theme.colors.white};
	margin-right: 20px;
	margin-bottom: 40px;
	border-radius: ${(props) => props.theme.radius.largeRadius}
		${(props) => props.theme.radius.largeRadius} 0px 0px;
	box-shadow: 0px 5px 5px 0px ${(props) => props.theme.colors.gray500};
`;

const ThumbnailContainer = styled.div`
	background-image: url(${thumbnail});
	background-size: 230px 180px;
	overflow: hidden;
	border-radius: ${(props) => props.theme.radius.largeRadius}
		${(props) => props.theme.radius.largeRadius} 0px 0px;
	height: 180px;
`;

const MusicContainer = styled.div`
	height: 180px;
	border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
	padding: 10px;
	overflow: auto;

	.music_logo {
		margin-right: 5px;
	}
`;

const MusicElement = styled.div`
	display: flex;
	align-items: center;
	margin: 5px;
	padding-bottom: 5px;
	white-space: nowrap;
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
	}
`;

const PlaylistPart = () => {
	return (
		<PlaylistSection>
			<ThumbnailContainer></ThumbnailContainer>
			<MusicContainer>
				<MusicElement>
					<span>
						<FcMusic className="music_logo" />
					</span>
					사건의 지평선 - 윤하
				</MusicElement>
				<MusicElement>
					<span>
						<FcMusic className="music_logo" />
					</span>
					Antifreeze - 검정치마
				</MusicElement>
				<MusicElement>
					<span>
						<FcMusic className="music_logo" />
					</span>
					나무 - 카더가든
				</MusicElement>
				<MusicElement>
					<span>
						<FcMusic className="music_logo" />
					</span>
					거절할거야 - 장기하와 얼굴들
				</MusicElement>
				<MusicElement>
					<span>
						<FcMusic className="music_logo" />
					</span>
					곳에 따라 비 - 가을방학
				</MusicElement>
				<MusicElement>
					<span>
						<FcMusic className="music_logo" />
					</span>
					Trip - 릴러말즈
				</MusicElement>
				<MusicElement>
					<span>
						<FcMusic className="music_logo" />
					</span>
					<div>Love Never Felt So Good - Michael Jackson</div>
				</MusicElement>
				<MusicElement>
					<span>
						<FcMusic className="music_logo" />
					</span>
					<span>The Kiss Of Venus - PAUL McCARTNEY</span>
				</MusicElement>
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
			</OptionContainer>
		</PlaylistSection>
	);
};

export default PlaylistPart;
