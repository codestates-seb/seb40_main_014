import instance from './root';

export const getPlaylists = async (
	memberId: number,
	page?: number,
	size?: number,
) => {
	try {
		//test
		// const result = await instance.get('/playlists');
		//real
		const result = await instance.get(
			`/api/${memberId}/playlists?page=${page}&size=${size}`,
		);

		return result.data;
	} catch (err) {
		return err;
	}
};

export const getPlayList = async (data) => {
	try {
		//test
		// const result = await instance.get('/playlist');
		//real
		const result = await instance.get(`/api/playlists/${data}`);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const createPlayList = async (data) => {
	try {
		//test
		// data.like = 0;
		// data.playListId = 1;
		// const result = await instance.post('/playlist', data);
		//real
		const result = await instance.post(`/api/playlists`, data);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const modifyPlayList = async (data) => {
	try {
		//test
		// const result = await instance.post('/playlist', data);
		//real
		const result = await instance.patch(
			`/api/playlists/${data.playlistId}`,
			data,
		);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const deletePlayList = async (data) => {
	try {
		//test
		// const result = await instance.delete(`/playlist`);
		//real
		const result = await instance.delete(`/api/playlist/${data}`);
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
