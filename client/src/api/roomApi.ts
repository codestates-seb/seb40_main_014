import instance from './root';

export const getRooms = async (page: number, size: number) => {
	try {
		//test
		// const result = await instance.get(`/roomss`);
		//real
		const result = await instance.get(`/rooms?page=${page}&size=${size}`);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const createRoom = async (data) => {
	try {
		const result = await instance.post(`/rooms`, data);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const getRoomById = async (roomId) => {
	try {
		const result = await instance.get(`/rooms/${roomId}`);
		return result.data;
	} catch (err) {
		return err;
	}
};
