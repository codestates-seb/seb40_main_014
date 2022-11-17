import axios from 'axios';
import instance, { root } from './root';

export const login = async () => {
	try {
		const result = await axios.post(`${root}/login/oauth2/code/google`);

		const accessToken = result.headers.authorization;
		localStorage.setItem('accessToken', accessToken);

		return result.data;
	} catch (err) {
		return err;
	}
};

export const logout = async () => {
	try {
		const result = await instance.post('/api/members/logout');

		return result.data;
	} catch (err) {
		return err;
	}
};
