import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type InitialState = {
	memberId: number;
	follow: number;
	like: number;
	name: string;
	createdAt: string;
	modifiedAt: string;
	grade: string;
	rank: number;
};

const initialState: InitialState = {
	memberId: 1,
	follow: 10,
	like: 10,
	name: 'nickname',
	createdAt: '회원 생성 시간',
	modifiedAt: '회원 수정 시간',
	grade: 'LUVIP',
	rank: 1,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userInfo: (state, action) => {
			state = action.payload;
		},
	},
});

export default userSlice.reducer;
export const { userInfo } = userSlice.actions;
export const user = (state: RootState) => state.user;
