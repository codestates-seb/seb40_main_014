import instance from './root';

export const getUserInfo = async (memberId: number) => {
	try {
		const result = await instance.get(`/api/members/${memberId}`);

		return result.data;
	} catch (err) {
		return err;
	}
};
