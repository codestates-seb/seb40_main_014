import instance from './root';

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
		data.like = 0;
		data.playListId = 1;
		const result = await instance.post('/playlist', data);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const patchLike = async (data) => {
	try {
		//test
		let result;
		const pl = await instance.get('/playlist');
		if (data.type === 'like') {
			result = await instance.post('/likelist', {
				likelist: [data.playListId],
			});
			pl.data.like = 1;
		}
		if (data.type === 'unlike') {
			result = await instance.post('/likelist', { likelist: [] });
			pl.data.like = 0;
		}
		await instance.post('/playlist', pl.data);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const updateBookMark = async (data) => {
	try {
		//test
		let result;
		if (data.type === 'add') {
			result = await instance.post('/bookmarklist', {
				bookmarklist: [data.playListId],
			});
		}
		if (data.type === 'cancel') {
			result = await instance.post('/bookmarklist', { bookmarklist: [] });
		}
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

export const getPlaylists = async () => {
	try {
		//test
		const result = await instance.get('/playlists');

		return result.data;
	} catch (err) {
		return err;
	}
};

export const getRooms = async () => {
	try {
		//test
		const result = await instance.get('/roomss');

		return result.data;
	} catch (err) {
		return err;
	}
};
