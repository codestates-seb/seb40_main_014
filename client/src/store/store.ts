import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../slices/counterSlice';
import userSlice from '../slices/userSlice';

const store = configureStore({
	reducer: {
		counter: counterSlice,
		user: userSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
