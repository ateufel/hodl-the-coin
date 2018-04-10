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
			fontSize: 64,
			color: '#fbf201',
			shadow: '#e79617'
		},
		tapToStart: {
			fontFamily: 'MunroSmall',
			fontSize: 48,
			color: '#fbf201',
			shadow: '#e79617'
		},
		likeGame: {
			fontFamily: 'MunroSmall',
			fontSize: 48,
			color: '#aa96fb',
			shadow: '#5947a0'
		},
		followSteemit: {
			fontFamily: 'MunroSmall',
			fontSize: 26,
			color: '#aa96fb',
			shadow: '#5947a0'
		},
		poweredBy: {
			fontFamily: 'MunroSmall',
			fontSize: 26,
			color: '#5947a0'
		},
		gameOverScoreMeta: {
			fontFamily: 'MunroSmall',
			fontSize: 48,
			color: '#aa96fb',
			shadow: '#5947a0'
		},
		gameOverScoreValues: {
			fontFamily: 'MunroSmall',
			fontSize: 48,
			color: '#fbf201',
			shadow: '#e79617'
		}
	}
};

module.exports = Config;
