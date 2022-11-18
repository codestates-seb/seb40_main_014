import axios from 'axios';

const root: string | undefined = process.env.REACT_APP_STACK_SERVER_TEST;
// const root = process.env.REACT_APP_STACK_SERVER;

type config = {
	headers: object;
	baseURL: string | undefined;
};

const axiosConfig: config = {
	headers: { 'Content-Type': 'application/json; charset=UTF-8' },
	baseURL: root,
};

const instance = axios.create(axiosConfig);
// youtube api 에서 withCredentials = true 하면 cors에 막힘
// instance.defaults.withCredentials = true; // withCredentials 전역 설정

export default instance;
