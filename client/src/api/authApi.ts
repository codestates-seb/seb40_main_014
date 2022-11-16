import axios from 'axios';

const root = process.env.REACT_APP_STACK_SERVER;

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
