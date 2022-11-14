import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../components/common/Loading';
import Layout from '../components/common/Layout';

const RoomMain = lazy(() => import('../pages/RoomMain'));
const PlaylistMain = lazy(() => import('../pages/PlaylistMain'));
const Ranking = lazy(() => import('../pages/Ranking'));

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
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRouter;
