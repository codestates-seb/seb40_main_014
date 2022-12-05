import instance from './root';

export const getUserInfo = async (memberId: number) => {
	try {
		const result = await instance.get(`/api/members/${memberId}`);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const getAllUserInfo = async () => {
	try {
		const result = await instance.get(`/api/members/`);

		return result.data;
	} catch (err) {
		return err;
	}
};

export const editUserInfo = async (
	memberId: number,
	name: string,
	content: string,
) => {
	try {
		const result = await instance.patch(`/api/members/${memberId}`, {
			name,
			content,
		});

		return result.data;
	} catch (err) {
		return err;
	}
};

export const followUser = async (memberId: number) => {
	try {
		const result = await instance.post(`/api/members/follow/${memberId}`);

		return result.data;
	} catch (err) {
		return err;
	}
};

export const getFollowList = async (memberId: number) => {
	try {
		const result = await instance.get(`/api/members/following/${memberId}`);

		return result.data;
	} catch (err) {
		return err;
	}
};

export const getBookmarkList = async (memberId: number) => {
	try {
		const result = await instance.get(`/api/playlists/bookmark/${memberId}`);

		return result.data;
	} catch (err) {
		return err;
	}
};
