import axios from 'axios';

export const root: string | undefined = process.env.REACT_APP_STACK_SERVER_TEST;
// export const root = process.env.REACT_APP_STACK_SERVER;

type config = {
	headers: object;
	baseURL: string | undefined;
};

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const axiosConfig: config = {
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		Authorization: accessToken,
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
			axios
				.post(`${root}/api/respreshToken`, {
					headers: {
						Authorization: accessToken,
						Refresh: refreshToken,
					},
				})
				.then((res) => {
					const newAccessToken = res.headers.Authorization;
					// const newRefreshToken = res.headers.Refresh;

					localStorage.setItem('accessToken', newAccessToken);
					// localStorage.setItem('refreshToken', newRefreshToken);

					window.alert('로그인이 연장되었습니다. (테스트용)');
				})
				.catch((err) => {
					// 리프레시 토큰 만료 => 로그아웃
					if (err.response.status === 404) {
						window.alert('로그인이 만료되었습니다.');

						localStorage.removeItem('accessToken');
						localStorage.removeItem('refreshToken');
						dispatch(myLogout());

						window.location.href = '/';
					}
				});
		}

		return Promise.reject(error);
	},
);

// youtube api 에서 withCredentials = true 하면 cors에 막힘
// instance.defaults.withCredentials = true; // withCredentials 전역 설정

export default instance;
