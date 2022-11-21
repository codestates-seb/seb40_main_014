import instance from './root';

export const logout = async () => {
	const refreshToken = localStorage.getItem('refreshToken');

	try {
		const result = await instance.post(
			'/api/members/logout',
			{},
			{
				headers: {
					'Content-Type': 'application/json; charset=UTF-8',
					RefreshToken: refreshToken,
				},
			},
		);

		return result.data;
	} catch (err) {
		return err;
	}
};
