import GlobalStyle from './assets/styles/GlobalStyle';
import AppRouter from './routes/AppRouter';
import { ThemeProvider } from 'styled-components';
import theme from './assets/styles/theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<AppRouter />
		</ThemeProvider>
	);
}

export default App;
