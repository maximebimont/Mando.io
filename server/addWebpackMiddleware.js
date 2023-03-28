import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.js';

export default function addWebpackMiddleware(app) {
	const webpackConfigForMiddleware = {
		...webpackConfig,
		mode: 'development', 
		plugins: [new webpack.HotModuleReplacementPlugin()], 
	};
	if (typeof webpackConfigForMiddleware.entry === 'string') {
		webpackConfigForMiddleware.entry = [
			'webpack-hot-middleware/client?reload=true', 
			webpackConfigForMiddleware.entry, 
		];
	}
	const compiler = webpack(webpackConfigForMiddleware);
	app.use(
		webpackDevMiddleware(compiler, {
			publicPath: webpackConfig.output?.publicPath,
		})
	);
	app.use(webpackHotMiddleware(compiler));
}
