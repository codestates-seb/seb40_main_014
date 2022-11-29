import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../components/common/Loading';
import Layout from '../components/common/Layout';
import PlaylistList from '../pages/PlaylistList';
import Room from '../pages/Room';
import EditProfile from '../pages/EditProfile';
import ScrollToTop from '../components/common/ScrollToTop';

// const Main = lazy(() => import('../pages/Main'));
const LoginCallback = lazy(() => import('../pages/LoginCallback'));
const PlayListDetail = lazy(() => import('../pages/PlayListDetail'));
const RoomList = lazy(() => import('../pages/RoomList'));
const RankingList = lazy(() => import('../pages/RankingList'));
const MakePlayList = lazy(() => import('../pages/MakePlayList'));
const Mypage = lazy(() => import('../pages/Mypage'));
const PlayListCollection = lazy(() => import('../pages/PlayListCollection'));
const Search = lazy(() => import('../pages/Search'));

const AppRouter = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route element={<Layout />}>
						{/* 메인 */}
						<Route path="/" element={<RoomList />} />
						<Route path="/playlist" element={<PlaylistList />} />
						<Route path="/ranking" element={<RankingList />} />
						<Route path="/search" element={<Search />} />
						<Route path="/mypage/:userId" element={<Mypage />} />
						<Route path="/editProfile" element={<EditProfile />} />
						{/* 플레이리스트 */}
						<Route path="/playlistdetail/:id" element={<PlayListDetail />} />
						<Route path="/makeplaylist/:type" element={<MakePlayList />} />
						<Route path="/makeplaylist/:type/:id" element={<MakePlayList />} />
						<Route
							path="/playlistcollection/:id/:userId"
							element={<PlayListCollection />}
						/>
						{/* 방 */}
						<Route path="/rooms/:id" element={<Room />} />
					</Route>
					<Route path="/loginCallback" element={<LoginCallback />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRouter;
