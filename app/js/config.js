'use strict';

const Config = {
	appId: 'xxx',
	pageId: 'xxx',
	devMode: true,
	serverPath: 'https://yourdomain.at/subfolder/',
	metatags: {
		title: 'My App',
		description: 'My App Description',
		ogURL: 'https://limesoda.lsapps.at/limeapp/',
		ogImage: 'https://limesoda.lsapps.at/limeapp/img/share.jpg',
		ogImageWidth: 1200,
		ogImageHeight: 630
	},
	fonts: {
		score: {
			fontFamily: 'MunroSmall',
			fontSize: 128,
			color: '#fbf201'
		},
		tapToStart: {
			fontFamily: 'MunroSmall',
			fontSize: 64,
			color: '#fbf201'
		}
	}
};

module.exports = Config;
