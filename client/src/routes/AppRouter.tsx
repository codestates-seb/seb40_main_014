import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../components/common/Loading';
import Layout from '../components/common/Layout';
import ScrollToTop from '../components/common/ScrollToTop';
import Room from '../pages/Room';
import Logout from '../pages/Logout';

const LoginCallback = lazy(() => import('../pages/LoginCallback'));
const Mypage = lazy(() => import('../pages/Mypage'));
const SearchBar = lazy(() => import('../pages/SearchBar'));
const Search = lazy(() => import('../pages/Search'));
const RankingList = lazy(() => import('../pages/RankingList'));

const RoomList = lazy(() => import('../pages/RoomList'));

const PlaylistList = lazy(() => import('../pages/PlaylistList'));
const PlayListDetail = lazy(() => import('../pages/PlayListDetail'));
const PlayListCollection = lazy(() => import('../pages/PlayListCollection'));
const MakePlayList = lazy(() => import('../pages/MakePlayList'));

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
						<Route path="/searchbar" element={<SearchBar />} />
						<Route path="/search" element={<Search />} />
						<Route path="/mypage/:userId" element={<Mypage />} />
						{/* 플레이리스트 */}
						<Route path="/playlistdetail/:id" element={<PlayListDetail />} />
						<Route path="/makeplaylist/:type" element={<MakePlayList />} />
						<Route path="/makeplaylist/:type/:id" element={<MakePlayList />} />
						<Route
							path="/playlistcollection/:id/:userId"
							element={<PlayListCollection />}
						/>
					</Route>
					{/* 방 */}
					<Route path="/rooms/:id" element={<Room />} />
					<Route path="/loginCallback" element={<LoginCallback />} />
					<Route path="*" element={<Navigate to="/" replace />} />
					{/* 방 */}
					<Route path="/rooms/:id" element={<Room />} />
					<Route path="/logout" element={<Logout />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRouter;
