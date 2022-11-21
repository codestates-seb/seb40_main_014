import instance from './root';

export const getPlaylists = async (
	memberId: number,
	page: number,
	size: number,
) => {
	try {
		const result = await instance.get(
			`/api/${memberId}/playlists?page=${page}&size=${size}`,
		);

		return result.data;
	} catch (err) {
		return err;
	}
};

export const getPlayList = async () => {
	try {
		//test
		const result = await instance.get('/playlist');
		return result.data;
	} catch (err) {
		return err;
	}
};

export const createPlayList = async (data) => {
	try {
		//test
		data.like = 13;
		const result = await instance.post('/playlist', data);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const modifyPlayList = async (data) => {
	try {
		//test
		data.like = 13;
		const result = await instance.post('/playlist', data);
		return result.data;
	} catch (err) {
		return err;
	}
};
