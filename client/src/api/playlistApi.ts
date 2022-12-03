import { plinfo } from './../pages/PlayListDetail';
import instance, { isTest } from './root';

export const getPlaylists = async (page?: number, size?: number) => {
	try {
		let result;
		if (isTest) {
			result = await instance.get('/playlists');
		} else {
			result = await instance.get(`/api/playlists?page=${page}&size=${size}`);
		}

		return result.data;
	} catch (err) {
		return err;
	}
};

export const getPlaylistsByLike = async (page: number, size: number) => {
	try {
		const result = await instance.get(
			`/api/playlists/likeSort?page=${page}&size=${size}`,
		);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const getPlaylistsByDj = async (page: number, size: number) => {
	try {
		const result = await instance.get(
			`/api/playlists/topDj?page=${page}&size=${size}`,
		);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const getPlayList = async (data?) => {
	try {
		let result;
		if (isTest) {
			result = await instance.get('/playlist');
		} else {
			result = await instance.get(`/api/playlists/${data}`);
		}
		return result.data;
	} catch (err) {
		return err;
	}
};

export const createPlayList = async (playlistInfo: plinfo) => {
	try {
		let result;
		if (isTest) {
			result = await instance.post('/playlist', playlistInfo);
		} else {
			result = await instance.post(`/api/playlists`, playlistInfo);
		}
		return result.data;
	} catch (err) {
		return err;
	}
};

export const modifyPlayList = async (playlistInfo: plinfo) => {
	try {
		let result;
		if (isTest) {
			result = await instance.post('/playlist', playlistInfo);
		} else {
			result = await instance.patch(
				`/api/playlists/${playlistInfo.playlistId}`,
				playlistInfo,
			);
		}
		return result.data;
	} catch (err) {
		return err;
	}
};

export const deletePlayList = async (playlistId: number) => {
	try {
		let result;
		if (isTest) {
			result = await instance.delete(`/playlist`);
		} else {
			result = await instance.delete(`/api/playlists/${playlistId}`);
		}
		return result.data;
	} catch (err) {
		return err;
	}
};

export const postLike = async (playlistId: number) => {
	try {
		const result = await instance.post(`api/playlists/${playlistId}/likes`);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const postBookMark = async (playlistId: number) => {
	try {
		const result = await instance.post(`api/playlists/${playlistId}/bookmark`);
		return result.data;
	} catch (err) {
		return err;
	}
};
