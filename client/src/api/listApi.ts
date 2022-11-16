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

export const getPlayLists = async () => {
	try {
		//test
		const result = await instance.get('/playlists');
		return result.data;
	} catch (err) {
		return err;
	}
};
