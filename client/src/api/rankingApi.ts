import instance from './root';

export const getRanking = async () => {
	try {
		//test
		// const result = await instance.get(`/ranking`);
		//real
		const result = await instance.get(`/api/members/ranking`);
		return result.data;
	} catch (err) {
		return err;
	}
};
