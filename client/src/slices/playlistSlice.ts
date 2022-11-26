import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type InitialStateValue = {
	playlistId: number;
	title: string;
};

type InitialState = {
	playlistId: number;
	title: string;
};

const initialStateValue: InitialStateValue = {
	playlistId: 1,
	title: '플레이리스트를 입력해주세요',
};

const initialState: InitialState = {
	playlistId: 1,
	title: '플레이리스트를 입력해주세요',
};

const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {
		currentPlaylistInfo: (state, action) => {
			// console.log('액션페이로드', action.payload);
			state.playlistId = action.payload.playlistId;
			state.title = action.payload.title;
		},
	},
});

export default playlistSlice.reducer;
export const { currentPlaylistInfo } = playlistSlice.actions;
