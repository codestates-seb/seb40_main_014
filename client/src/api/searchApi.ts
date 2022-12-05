import instance from './root';

export const getSearchRooms = async (
	type: string,
	name: string,
	page: number,
	size: number,
) => {
	try {
		const result = await instance.get(
			`/rooms/search?type=${type}&name=${name}&page=${page}&size=${size}`,
		);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const getSearchPlaylists = async (
	type: string,
	name: string,
	page: number,
	size: number,
) => {
	try {
		const result = await instance.get(
			`/api/playlists/search?type=${type}&name=${name}&page=${page}&size=${size}`,
		);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const getSearchUsers = async (
	name: string,
	page: number,
	size: number,
) => {
	try {
		const result = await instance.get(
			`/api/members/search?name=${name}&page=${page}&size=${size}`,
		);
		return result.data;
	} catch (err) {
		return err;
	}
};
