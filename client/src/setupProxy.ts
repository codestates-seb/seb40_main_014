import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app) => {
	app.use(
		'/ws',
		createProxyMiddleware({
			target: 'ws://ec2-3-36-120-103.ap-northeast-2.compute.amazonaws.com:8080',
			ws: true,
		}),
	);
};
