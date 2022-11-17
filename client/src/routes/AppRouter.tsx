import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../components/common/Loading';
import Layout from '../components/common/Layout';
import Modaltest from '../pages/Modaltest';
import PlaylistList from '../pages/PlaylistList';
import Room from '../pages/Room';

// const Main = lazy(() => import('../pages/Main'));
const PlayListDetail = lazy(() => import('../pages/PlayListDetail'));
const RoomList = lazy(() => import('../pages/RoomList'));
const Ranking = lazy(() => import('../pages/Ranking'));
const PlayListModify = lazy(() => import('../pages/PlayListModify'));
const Mypage = lazy(() => import('../pages/Mypage'));
const PlayListCollection = lazy(() => import('../pages/PlayListCollection'));

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<RoomList />} />
						<Route path="/playlist" element={<PlaylistList />} />
						<Route path="/ranking" element={<Ranking />} />
						<Route path="/playlistdetail" element={<PlayListDetail />} />
						<Route path="/playlistmodify" element={<PlayListModify />} />
						<Route path="/modal" element={<Modaltest />} />
						<Route path="/mypage" element={<Mypage />} />
						<Route
							path="/playlistcollection"
							element={<PlayListCollection />}
						/>

						<Route path="/rooms/:id" element={<Room />} />
					</Route>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRouter;
