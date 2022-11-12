import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type InitialState = {
	id: number;
	value: number;
};

const initialState: InitialState = {
	id: 1,
	value: 0,
};
const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		up: (state, action) => {
			state.value = state.value + action.payload;
		},
		down: (state, action) => {
			state.value = state.value - action.payload;
		},
		init: (state) => {
			state.value = 0;
		},
	},
});

export default counterSlice.reducer;
export const { up, down, init } = counterSlice.actions;
export const selectValue = (state: RootState) => state.counter.value; // 9.
