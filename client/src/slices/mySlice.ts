import { createSlice } from '@reduxjs/toolkit';
import { PlaylistInfoType } from '../pages/PlaylistList';
import { RootState } from '../store/store';

export type MyInitialStateValue = {
	memberId: number;
	email: string;
	name: string;
	picture: string;
	grade: string;
	follow: number;
	followState: boolean;
	rank: number;
	role: string;
	createdAt: string;
	modifiedAt: string;
	playlist: Array<PlaylistInfoType>;
	content: string;
};

type MyInitialState = {
	isLogin: boolean;
	value: MyInitialStateValue;
};

export const myInitialStateValue: MyInitialStateValue = {
	memberId: 0,
	email: '',
	name: '',
	picture: '',
	grade: '',
	follow: 0,
	followState: false,
	rank: 0,
	role: '',
	createdAt: '',
	modifiedAt: '',
	playlist: [],
	content: '',
};

const initialState: MyInitialState = {
	isLogin: false,
	value: myInitialStateValue,
};

const mySlice = createSlice({
	name: 'my',
	initialState,
	reducers: {
		myInfo: (state, action) => {
			state.isLogin = true;
			state.value = action.payload;
		},
		myLogout: (state) => {
			state.isLogin = false;
			state.value = myInitialStateValue;
		},
	},
});

export default mySlice.reducer;
export const { myInfo, myLogout } = mySlice.actions;
export const myValue = (state: RootState) => state.my.value;
export const myLogin = (state: RootState) => state.my.isLogin;
