import axios from 'axios';

export const root = process.env.REACT_APP_STACK_SERVER;

type config = {
	headers: object;
	baseURL: string | undefined;
};

const axiosConfig: config = {
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		Authorization: localStorage.getItem('accessToken'),
	},
	baseURL: root,
};

const instance = axios.create(axiosConfig);

instance.interceptors.response.use(
	(response) => {
		return response;
	},

	async (error) => {
		// 액세스 토큰 만료 => 새 액세스 토큰 발급(연장)
		if (error.response.status === 401) {
			instance
				.post(
					`/api/members/refresh`,
					{},
					{
						headers: {
							RefreshToken: localStorage.getItem('refreshToken'),
						},
					},
				)
				.then((res) => {
					localStorage.setItem('accessToken', res.headers.authorization);

					window.alert('로그인이 연장되었습니다. 새로고침됩니다.');
					window.location.reload();
				})
				.catch((err) => {
					// 리프레시 토큰 만료 => 로그아웃
					if (err.response.status === 404) {
						window.alert('로그인이 만료되었습니다. 홈으로 이동됩니다.');
						window.location.href = '/logout';
					}
				});
		}

		return Promise.reject(error);
	},
);

export default instance;

export const isTest = !(root === process.env.REACT_APP_STACK_SERVER);
