import { createSlice } from '@reduxjs/toolkit';
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
	likeList?: Array<number>;
	bookMarkList?: Array<number>;
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
	likeList: [],
	bookMarkList: [],
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
		changeLikeList: (state, action) => {
			state.value.likeList = action.payload;
		},
		changeBookMarkList: (state, action) => {
			state.value.bookMarkList = action.payload;
		},
	},
});

export default mySlice.reducer;
export const { myInfo, myLogout, changeLikeList, changeBookMarkList } =
	mySlice.actions;
export const myValue = (state: RootState) => state.my.value;
export const myLogin = (state: RootState) => state.my.isLogin;
export const selectLikeList = (state: RootState) => state.my.value.likeList;
export const selectBookMarkList = (state: RootState) =>
	state.my.value.bookMarkList;
