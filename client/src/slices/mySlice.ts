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
	likeList?: Array<number>;
	bookMarkList?: Array<number>;
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
	likeList: [],
	bookMarkList: [],
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
