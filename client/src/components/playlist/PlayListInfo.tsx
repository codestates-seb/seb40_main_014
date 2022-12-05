import styled from 'styled-components';
import { PlayListInfoProps } from '../../pages/PlayListDetail';
import Category from '../common/Category';
import BookMark from '../common/BookMark';
import Like from '../common/Like';
import ModifyButton from '../playlistcollection/ModifyButton';
import { useSelector } from 'react-redux';
import { myLogin, myValue } from '../../slices/mySlice';
import { Link } from 'react-router-dom';

const PlayListInfo = ({
	playListInfo,
	setPlayListInfo,
	picture,
}: PlayListInfoProps) => {
	const isLogin = useSelector(myLogin);
	const loginId = useSelector(myValue).memberId;

	const likeBookmarkProps = {
		setPlayListInfo,
		isLogin,
		loginId,
		memberId: playListInfo.memberId,
		playlistId: playListInfo.playlistId,
		likeState: playListInfo.likeState,
		bookmarkState: playListInfo.bookmarkState,
		likeCount: playListInfo.like,
	};
	return (
		<PlayListInfoStyle>
			<div className="info">
				<Img>
					<img src={playListInfo.playlistItems[0].thumbnail} alt="썸네일" />
				</Img>
				<Info>
					<div className="title">
						{playListInfo.title}
						<div className="categoryBox">
							{playListInfo.categoryList &&
								playListInfo.categoryList.map((ele: string, idx) => (
									<Link
										key={idx}
										to={`/search?type1=playlist&type2=category&q=${ele}`}>
										<Category category={ele} margin="0 10px 0 0">
											{ele}
										</Category>
									</Link>
								))}
						</div>
					</div>
					<div className="options">
						<div>
							<div>
								<Link to={`/mypage/${playListInfo.memberId}`}>
									<img src={picture} alt="프로필" />
									<button>{playListInfo.name}</button>
								</Link>
							</div>
							<div>
								<Like {...likeBookmarkProps} />
								<BookMark {...likeBookmarkProps} />
							</div>
						</div>
						<div>
							{loginId === playListInfo.memberId && (
								<ModifyButton
									playlistId={playListInfo.playlistId}
									fontSize="16px"
									playlistName={playListInfo.title}
								/>
							)}
						</div>
					</div>
				</Info>
			</div>
			<div className="total">{playListInfo.playlistItems.length} 곡</div>
		</PlayListInfoStyle>
	);
};

export default PlayListInfo;

const PlayListInfoStyle = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;

	.info {
		display: flex;
		justify-content: center;
		@media (max-width: 640px) {
			flex-direction: column;
		}
	}

	.total {
		font-size: ${(props) => props.theme.fontSize.large};
		margin: 40px 0 25px 0;

		// Mobile
		@media screen and (max-width: 640px) {
			font-size: 18px;
		}
	}
`;

const Img = styled.span`
	width: 30%;
	@media (max-width: 980px) {
		width: 40%;
	}
	@media (max-width: 640px) {
		width: 100%;
		margin-bottom: 10px;
	}

	img {
		width: 100%;
		object-fit: cover;
	}
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	width: 40%;
	margin-left: 5%;
	@media (max-width: 980px) {
		width: 52%;
		margin-left: 8%;
	}
	@media (max-width: 640px) {
		width: 100%;
		margin-left: 0;
	}

	.title {
		font-size: 22px;
		line-height: 1.5;
		font-weight: 600;
		.categoryBox {
			margin: 10px 0;
		}

		// Tablet
		@media screen and (max-width: 980px) {
			font-size: 18px;
		}
		// Mobile
		@media screen and (max-width: 640px) {
			font-size: 18px;
		}
	}

	.options {
		> div:first-of-type {
			display: flex;
			flex-direction: column;
			> div:first-of-type {
				a {
					display: flex;
					align-items: center;
					img {
						width: 25px;
						margin-right: 5px;
						border-radius: 50%;
						object-fit: cover;
					}
					button {
						margin-left: 5px;
						margin-right: 20px;
					}
				}
				:hover {
					opacity: 0.75;
				}
			}
			> div:last-of-type {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				margin-top: 10px;

				button {
					display: flex;
					align-items: center;
					span {
						margin-left: 7px !important;
					}
					:hover {
						opacity: 0.75;
					}
				}

				> *:last-child {
					margin-left: 15px;
				}

				// Mobile
				@media screen and (max-width: 640px) {
					span {
						font-size: ${(props) => props.theme.fontSize.small};
					}
				}
			}
		}

		> div:last-of-type {
			display: flex;
			justify-content: flex-end;
			margin-top: 10px;
		}
	}
`;
