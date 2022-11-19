import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../slices/counterSlice';
import mySlice from '../slices/mySlice';

const store = configureStore({
	reducer: {
		counter: counterSlice,
		my: mySlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
