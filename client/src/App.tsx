import GlobalStyle from './assets/styles/GlobalStyle';
import AppRouter from './routes/AppRouter';
import { ThemeProvider } from 'styled-components';
import theme from './assets/styles/theme';
import { getUserInfo } from './api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { myInfo, myLogin, myValue } from './slices/mySlice';
import { useEffect } from 'react';

function App() {
	const dispatch = useDispatch();

	const { memberId } = useSelector(myValue);
	const isLogin = useSelector(myLogin);

	useEffect(() => {
		{
			isLogin &&
				getUserInfo(Number(memberId)).then((res) => {
					console.log('getUserInfo res', res);
					dispatch(myInfo(res.data));
				});
		}
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<AppRouter />
		</ThemeProvider>
	);
}

export default App;
