import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../components/common/Loading';
import Layout from '../components/common/Layout';
import PlaylistList from '../pages/PlaylistList';
import Room from '../pages/Room';
import EditProfile from '../pages/EditProfile';
import Chat from '../components/chat/Chat';
import Chattest from '../components/chat/Chattest';
import StompChat from '../components/chat/ChatStompTest';

// const Main = lazy(() => import('../pages/Main'));
const LoginCallback = lazy(() => import('../pages/LoginCallback'));
const PlayListDetail = lazy(() => import('../pages/PlayListDetail'));
const RoomList = lazy(() => import('../pages/RoomList'));
const RankingList = lazy(() => import('../pages/RankingList'));
const MakePlayList = lazy(() => import('../pages/MakePlayList'));
const Mypage = lazy(() => import('../pages/Mypage'));
const PlayListCollection = lazy(() => import('../pages/PlayListCollection'));

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route element={<Layout />}>
						{/* 메인 */}
						<Route path="/" element={<RoomList />} />
						<Route path="/playlist" element={<PlaylistList />} />
						<Route path="/ranking" element={<RankingList />} />
						<Route path="/mypage/:userId" element={<Mypage />} />
						<Route path="/editProfile" element={<EditProfile />} />
						{/* 플레이리스트 */}
						<Route path="/playlistdetail/:id" element={<PlayListDetail />} />
						<Route path="/makeplaylist/:type" element={<MakePlayList />} />
						<Route path="/makeplaylist/:type/:id" element={<MakePlayList />} />
						<Route
							path="/playlistcollection"
							element={<PlayListCollection />}
						/>
						{/* 방 */}
						<Route path="/rooms/:id" element={<Room />} />
					</Route>
					<Route path="/chat" element={<Chat />} />
					<Route path="/chattest" element={<Chattest />} />
					<Route path="/chatstomp" element={<StompChat />} />
					<Route path="/loginCallback" element={<LoginCallback />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRouter;
