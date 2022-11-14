import { DefaultTheme } from 'styled-components';

const colors = {
	// basic
	white: '#ffffff',
	gray10: '#f7f7f7',
	gray50: '#f2f2f2',
	gray100: '#f0f0f0',
	gray200: '#e6e6e6',
	gray300: '#d6d6d6',
	gray400: '#c2c2c2',
	gray500: '#a3a3a3',
	gray600: '#858585',
	gray700: '#5c5c5c',
	gray800: '#333333',
	gray900: '#141414',
	black: '#000000',

	// theme
	lightPurple: '#c7bcdf',
	purple: '#4c0bd1',
	lightPink: '#ffa6c4',
	pink: '#e55989',
	lightOrange: '#ffba74',
	orange: '#fd6f22',
	headerBackground: '#080f34',
	background: '#e3e5eb',
};

const fontSize = {
	xLarge: '28px',
	large: '20px',
	medium: '16px',
	small: '14px',
	xSmall: '12px',
};

const radius = {
	smallRadius: '5px',
	largeRadius: '10px',
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;
export type RadiusTypes = typeof radius;

const theme: DefaultTheme = {
	colors,
	fontSize,
	radius,
};

export default theme;
