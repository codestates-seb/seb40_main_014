import instance from './root';

export const getRooms = async (page: number, size: number) => {
	try {
		const result = await instance.get(`/rooms?page=${page}&size=${size}`);

		return result.data;
	} catch (err) {
		return err;
	}
};
