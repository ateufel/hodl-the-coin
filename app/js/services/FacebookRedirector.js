import MobileDetect from 'mobile-detect';
//cookie = require('react-cookie'),
import Config from '../config';

const md = new MobileDetect(window.navigator.userAgent);

const FacebookRedirector = {
	check: () => {
		try {
			if (!md.mobile() && window.self === window.top && window.location.search.indexOf('preview=1') === -1) {
				//redirect to page on desktop
				//var appData = cookie.load('appData') || '';
				//appData = (appData !== '') ? '&app_data=' + appData : '';
				top.location.href = 'https://www.facebook.com/' + Config.pageId + '/?sk=app_' + Config.appId;
				return true;
			} else {
				return false;
			}
		} catch (e) {
			//do not redirect in case of error, just to be safe
		}
	}
};

export default FacebookRedirector;
