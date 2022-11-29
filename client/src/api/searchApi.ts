import instance from './root';

export const getSearchRooms = async (type: string, name: string) => {
	try {
		//test
		// const result = await instance.get(`/rooms`);
		//real
		const result = await instance.get(
			`/rooms/search?type=${type}&name=${name}`,
		);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const getSearchPlaylists = async (type: string, name: string) => {
	try {
		//test
		// const result = await instance.get(`/rooms`);
		//real
		const result = await instance.get(
			`/api/playlists/search?type=${type}&name=${name}`,
		);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const getSearchUsers = async (name: string) => {
	try {
		//test
		// const result = await instance.get(`/rooms`);
		//real
		const result = await instance.get(`/api/members/search?name=${name}`);
		return result.data;
	} catch (err) {
		return err;
	}
};
