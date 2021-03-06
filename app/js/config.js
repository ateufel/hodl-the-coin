'use strict';

/**
 * game config - needs to user module.exports because it is used in webpack too
 */
const Config = {
	firebaseAPIKey: 'xxx', //replace this with your own api key
	serverPath: 'https://games.limesoda.com/hodl-steem',
	metatags: {
		title: 'Hodl the Coin by LimeSoda',
		description: 'Hodl the Coin by LimeSoda',
		ogURL: 'https://games.limesoda.com/hodl-steem/',
		ogImage: 'https://games.limesoda.com/hodl-steem/img/share.jpg',
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
		},
		leaderboardHeadline: {
			fontFamily: 'MunroSmall',
			fontSize: 48,
			color: '#fbf201',
			shadow: '#e79617'
		},
		leaderboardUserName: {
			fontFamily: 'MunroSmall',
			fontSize: 32,
			color: '#aa96fb'
		},
		leaderboardUserScore: {
			fontFamily: 'MunroSmall',
			fontSize: 32,
			color: '#fbf201'
		},
		leaderboardClose: {
			fontFamily: 'MunroSmall',
			fontSize: 48,
			color: '#fbf201'
		}
	}
};

module.exports = Config;
