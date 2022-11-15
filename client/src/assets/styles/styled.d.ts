import 'styled-components';
import { ColorsTypes, FontSizeTypes, RadiusTypes } from './theme';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: ColorsTypes;
		fontSize: FontSizeTypes;
		radius: RadiusTypes;
	}
}
