import instance, { isTest } from './root';

export const getMyInfo = async (memberId: number, accessToken: string) => {
	try {
		const result = await instance.get(`/api/members/${memberId}`, {
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Authorization: accessToken,
			},
		});

		return result.data;
	} catch (err) {
		return err;
	}
};

export const getUserInfo = async (memberId: number) => {
	try {
		let result;
		if (isTest) {
			result = await instance.get(`/mypage`);
		} else {
			result = await instance.get(`/api/members/${memberId}`);
		}
		return result.data;
	} catch (err) {
		return err;
	}
};

export const getAllUserInfo = async (accessToken) => {
	try {
		const result = await instance.get(`/api/members/`, {
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Authorization: accessToken,
			},
		});

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
