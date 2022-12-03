import instance from './root';

export const getRanking = async () => {
	try {
		const result = await instance.get(`/api/members/ranking`);
		return result.data;
	} catch (err) {
		return err;
	}
};
