const path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	OfflinePlugin = require('offline-plugin'),
	Config = require('./app/js/config');

const HOST = process.env.HOST || '0.0.0.0',
	PORT = process.env.PORT || 8080;

module.exports = {
	entry: './app/js/main.js',
	output: {
		path: path.join(__dirname, 'build'),
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
		contentBase: path.join(__dirname, 'build'),
		/*proxy: {
			'/!*': 'http://limesoda.lsapps.at/limeapp'
		}*/
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|build)/,
				loader: 'babel-loader',
				/*query: {
				 // https://github.com/babel/babel-loader#options
				 cacheDirectory: true
				 },*/
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
				test: [/\.vert$/, /\.frag$/],
				use: 'raw-loader'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'CANVAS_RENDERER': JSON.stringify(true),
			'WEBGL_RENDERER': JSON.stringify(true)
		}),
		new HtmlWebpackPlugin({
			inject: false,
			template: 'htmlWebpackTemplate.ejs',
			appMountId: 'canvas',
			meta: [
				{name: 'description', content: Config.metatags.description},
				{name: 'og:type', content: 'website'},
				{name: 'og:title', content: Config.metatags.title},
				{name: 'og:description', content: Config.metatags.description},
				{name: 'og:image', content: Config.metatags.ogImage},
				{name: 'og:url', content: Config.metatags.ogURL},
				{name: 'og:image:width', content: Config.metatags.ogImageWidth},
				{name: 'og:image:height', content: Config.metatags.ogImageHeight}
			],
			minify: false,
			mobile: true,
			/*links: [
				'https://fonts.googleapis.com/css?family=Roboto',
				{
					href: '/apple-touch-icon.png',
					rel: 'apple-touch-icon',
					sizes: '180x180'
				},
				{
					href: '/favicon-32x32.png',
					rel: 'icon',
					sizes: '32x32',
					type: 'image/png'
				}
			],*/
			title: Config.metatags.title,
			/*window: {
				env: {
					apiHost: 'http://myapi.com/api/v1'
				}
			}*/
		}),
		new OfflinePlugin()
	]
};
