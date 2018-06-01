const path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	OfflinePlugin = require('offline-plugin'),
	fs = require('fs'),
	Config = require('./app/js/config');

const HOST = process.env.HOST || '0.0.0.0',
	PORT = process.env.PORT || 8080;

//get image and audio files for offline plugin
let cachingArray = [];
fs.readdirSync(path.join(__dirname, 'app/img')).forEach(file => {
	cachingArray.push('./img/' + file);
});
fs.readdirSync(path.join(__dirname, 'app/audio')).forEach(file => {
	cachingArray.push('./audio/' + file);
});

module.exports = env => {
	//change build folder depending on coin type
	const buildFolder = (env && env.COIN) ? `build-${env.COIN}` : 'build';

	return {
		entry: './app/js/main.js',
		output: {
			path: path.join(__dirname, buildFolder),
			filename: 'js/main.js'
		},
		//devtool: '#cheap-module-source-map',
		devServer: {
			historyApiFallback: true,
			hot: false,
			stats: 'errors-only',
			host: HOST,
			port: PORT,
			https: true,
			inline: true,
			contentBase: path.join(__dirname, buildFolder),
			/*proxy: {
				'/!*': 'http://limesoda.lsapps.at/limeapp'
			}*/
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules|build*)/,
					loader: 'babel-loader',
					options: {
						//presets and plugins in .babelrc
					}
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: 'style-loader',
							options: {
								//importLoaders: 1,
								//minimize: true
							}
						},
						{
							loader: 'css-loader',
							options: {
								modules: false
								//importLoaders: 1,
								//minimize: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: function () {
									return [
										require('postcss-cssnext')
									];
								}
							}
						},
					]
				},
				{
					test: [/\.vert$/, /\.frag$/], //needed for phaser engine
					use: 'raw-loader'
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'CANVAS_RENDERER': JSON.stringify(true), //needed for phaser engine
				'WEBGL_RENDERER': JSON.stringify(true), //needed for phaser engine
				'COIN': (env && env.COIN) ? JSON.stringify(env.COIN) : undefined
			}),
			new HtmlWebpackPlugin({
				inject: false,
				template: 'htmlWebpackTemplate.ejs',
				appMountId: 'canvas',
				meta: [
					{name: 'description', content: Config.metatags.description},
					{property: 'og:type', content: 'website'},
					{property: 'og:title', content: Config.metatags.title},
					{property: 'og:description', content: Config.metatags.description},
					{property: 'og:image', content: Config.metatags.ogImage},
					{property: 'og:image:secure_url', content: Config.metatags.ogImage},
					{property: 'og:url', content: Config.metatags.ogURL},
					{property: 'og:image:width', content: Config.metatags.ogImageWidth},
					{property: 'og:image:height', content: Config.metatags.ogImageHeight},
					{property: 'fb:app_id', content: Config.appId}
				],
				minify: false,
				mobile: true,
				title: Config.metatags.title
			}),
			new OfflinePlugin({
				externals: cachingArray,
				ServiceWorker: {
					events: true //activate service worker events for update checking
				}
			})
		]
	};
};
