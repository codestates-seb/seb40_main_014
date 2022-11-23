import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterSlice from '../slices/counterSlice';
import mySlice from '../slices/mySlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import roomSlice from '../slices/roomSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedMySlice = persistReducer(persistConfig, mySlice);

const store = configureStore({
	reducer: {
		counter: counterSlice,
		my: persistedMySlice,
		room: roomSlice,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
