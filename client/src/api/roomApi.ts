import instance from './root';

export const getRooms = async (page: number, size: number) => {
	try {
		//test
		// const result = await instance.get(`/rooms`);
		//real
		const result = await instance.get(`/rooms?page=${page}&size=${size}`);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const createRoom = async (data) => {
	try {
		const result = await instance.post(`/rooms/`, data);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const updateRoom = async (data, roomId) => {
	try {
		const result = await instance.patch(`/rooms/update/${roomId}`, data);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const deleteRoom = async (roomId) => {
	try {
		const result = await instance.delete(`/rooms/delete/${roomId}`);
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

export const checkRoomByName = async (roomId, memberName) => {
	try {
		const result = await instance.get(
			`/rooms/chat/${roomId}?memberName=${memberName}`,
		);
		return result.data;
	} catch (err) {
		return err;
	}
};
