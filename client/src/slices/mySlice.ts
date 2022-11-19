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

// const initialState: InitialState = {
// 	value: {
// 		memberId: 1,
// 		follow: 10,
// 		like: 10,
// 		name: '닉네임',
// 		createdAt: '회원 생성 시간',
// 		modifiedAt: '회원 수정 시간',
// 		grade: 'LUVIP',
// 		rank: 1,
// 	},
// };

const initialState: InitialState = {
	value: initialStateValue,
};

const mySlice = createSlice({
	name: 'my',
	initialState,
	reducers: {
		myInfo: (state, action) => {
			state.value = action.payload;
		},
		myLogout: (state) => {
			state.value = initialStateValue;
		},
	},
});

export default mySlice.reducer;
export const { myInfo, myLogout } = mySlice.actions;
export const myValue = (state: RootState) => state.my.value;
