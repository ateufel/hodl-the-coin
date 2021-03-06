import Phaser from 'phaser';
import Boot from './scenes/boot';
import Preloader from './scenes/preloader';
import Leaderboard from './scenes/leaderboard';
import Game from './scenes/game';
import styles from '../css/main.css';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

//Initialization of Offline Plugin (Service Worker) - autoreload on new version
OfflinePluginRuntime.install({
	onUpdating: () => {
		//console.log('SW Event:', 'onUpdating');
	},
	onUpdateReady: () => {
		//console.log('SW Event:', 'onUpdateReady');
		alert('new version, reloading...');
		OfflinePluginRuntime.applyUpdate();
	},
	onUpdated: () => {
		//console.log('SW Event:', 'onUpdated');
		window.location.reload();
	},
	onUpdateFailed: () => {
		//console.log('SW Event:', 'onUpdateFailed');
	}
});

//game config
const config = {
	width: window.innerWidth < 810 ? window.innerWidth : 810,
	height: window.innerHeight,
	parent: 'canvas',
	type: Phaser.AUTO,
	//scaleMode: 0,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0},
			debug: false
		}
	},
	scene: [
		Boot,
		Preloader,
		Game,
		Leaderboard
	],
	antialias: false,
	pixelArt: true,
	fps: 60
};
const game =  new Phaser.Game(config);

//emit resize even to game engine
window.onresize = () => {
	game.renderer.resize(window.innerWidth, window.innerHeight);
	game.events.emit('resize');
};
