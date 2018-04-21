import Config from '../config';

const Facebook = {
	init: function(callback) {
		window.fbAsyncInit = () => {
			FB.init({
				appId: Config.appId,
				autoLogAppEvents : true,
				xfbml: true,
				version: 'v2.12'
			});

			//FB.Canvas.setAutoGrow();

			if (callback) {
				callback(false);
			}
		};

		(function(d, s, id){
			let js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = '//connect.facebook.net/en_US/sdk.js';
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	},
	share: () => {
		FB.ui({
			method: 'share',
			href: Config.serverPath
		});
	},
	log: (eventName, customData) => {
		if (!FB) {
			return;
		}
		if (customData) {
			FB.AppEvents.logEvent(eventName, null, customData);
		} else {
			FB.AppEvents.logEvent(eventName);
		}

	}
};

export default Facebook;
