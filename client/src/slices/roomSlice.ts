import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type InitialStateValue = {
	roomId: string;
	title: string;
};

type InitialState = {
	value: InitialStateValue;
};

const initialStateValue: InitialStateValue = {
	roomId: '',
	title: '',
};

const initialState: InitialState = {
	value: initialStateValue,
};

const roomSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		currentRoomInfo: (state, action) => {
			// console.log('action', action);
			state.value = Object.assign(state.value, action.payload);
		},
	},
});

export default roomSlice.reducer;
export const { currentRoomInfo } = roomSlice.actions;
