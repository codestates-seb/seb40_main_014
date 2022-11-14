import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../components/common/Loading';
import Modaltest from '../pages/Modaltest';

// const Main = lazy(() => import('../pages/Main'));
const PlayListDetail = lazy(() => import('../pages/PlayListDetail'));

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<PlayListDetail />} />
					<Route path="*" element={<Navigate to="/" replace />} />
					<Route path="/modal" element={<Modaltest />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRouter;
