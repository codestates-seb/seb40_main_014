import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../components/common/Loading';
import Layout from '../components/common/Layout';
import Modaltest from '../pages/Modaltest';

// const Main = lazy(() => import('../pages/Main'));
const PlayListDetail = lazy(() => import('../pages/PlayListDetail'));
const RoomMain = lazy(() => import('../pages/RoomMain'));
const PlaylistMain = lazy(() => import('../pages/PlaylistMain'));
const Ranking = lazy(() => import('../pages/Ranking'));
const PlayListModify = lazy(() => import('../pages/PlayListModify'));

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<RoomMain />} />
						<Route path="/playlist" element={<PlaylistMain />} />
						<Route path="/ranking" element={<Ranking />} />
					</Route>
					<Route path="/playlistdetail" element={<PlayListDetail />} />
					<Route path="/playlistmodify" element={<PlayListModify />} />
					<Route path="*" element={<Navigate to="/" replace />} />
					<Route path="/modal" element={<Modaltest />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRouter;
