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
