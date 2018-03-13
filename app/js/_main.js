import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Phaser from 'phaser';
import Boot from './states/Boot';
import Preload from './states/Preload';
import Menu from './states/Menu';
import Game from './states/Game';
import Facebook from './services/Facebook';
import Config from './config';
import FacebookRedirector from './services/FacebookRedirector';
import MobileDetect from 'mobile-detect';
import Overlay from './misc/Overlay';
import styles from '../css/main.css';

//OfflinePluginRuntime.install();

let md = new MobileDetect(window.navigator.userAgent);
Facebook.init(Config.appId, (response) => {});

class Main extends Phaser.Game {
	constructor() {
		super('100%', '100%', Phaser.AUTO, 'canvas', null);

		let orientationError = false,
			winW = window.innerWidth,
			winH = window.innerHeight;

		if (winW > winH && md.mobile()) {
			//super(810, winH, Phaser.AUTO, 'canvas', null);
			//alert('Bitte drehen Sie Ihr Smartphone. Das Spiel ist nur im Hochformat möglich');
			orientationError = true;
			new Overlay('orientation');
			window.addEventListener('orientationchange', () => {
				window.location.reload(true);
			});
		}

		//detect landscape format and tell user to rotate his device
		if (!orientationError) {
			/*if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/WebKit/) && !navigator.userAgent.match(/CriOS/i)) {
				//iOS Safari fix (as always)
				//winH = window.innerHeight - 260;
			}
			if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/FBAV/i)) {
				//iOS Facebook In-App Browser fix (as always)
				//winH = window.innerHeight - 60;
				winH = window.innerHeight * window.devicePixelRatio;
			}
			//only for cordova
			if (window.cordova) {
				winH = window.innerHeight * window.devicePixelRatio;
			}*/
			this.state.add('Boot', Boot, false);
			this.state.add('Preload', Preload, false);
			this.state.add('Menu', Menu, false);
			this.state.add('Game', Game, false);
			this.state.start('Boot');
		}
	}
}

let isRedirected = false;
if (!Config.devMode && !window.cordova) {
	isRedirected = FacebookRedirector.check();
}

if (!isRedirected) {
	new Main();
}
