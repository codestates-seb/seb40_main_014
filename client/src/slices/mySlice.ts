import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type InitialStateValue = {
	memberId: number;
	follow: number;
	like: number;
	name: string;
	createdAt: string;
	modifiedAt: string;
	grade: string;
	rank: number;
	picture: string;
};

type InitialState = {
	isLogin: boolean;
	value: InitialStateValue;
};

const initialStateValue: InitialStateValue = {
	memberId: 0,
	follow: 0,
	like: 0,
	name: '',
	createdAt: '',
	modifiedAt: '',
	grade: '',
	rank: 0,
	picture: '',
};

const initialState: InitialState = {
	isLogin: false,
	value: initialStateValue,
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
			state.value = initialStateValue;
		},
	},
});

export default mySlice.reducer;
export const { myInfo, myLogout } = mySlice.actions;
export const myValue = (state: RootState) => state.my.value;
export const myLogin = (state: RootState) => state.my.isLogin;
