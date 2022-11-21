import instance from './root';

export const getUserInfo = async (memberId: number, accessToken: string) => {
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
