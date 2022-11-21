import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app) => {
	app.use(
		'/ws',
		createProxyMiddleware({
			target: `${process.env.REACT_APP_STACK_WS_SERVER}`,
			ws: true,
		}),
	);
};
