import Phaser from 'phaser';
import Preloader from './scenes/preloader';
import Game from './scenes/game';
import styles from '../css/main.css';

const config = {
	width: window.innerWidth,
	height: window.innerHeight,
	parent: 'canvas',
	type: Phaser.AUTO,
	//scaleMode: 0,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0},
			debug: true
		}
	},
	scene: [
		Preloader,
		Game
	],
	antialias: false
};
const game =  new Phaser.Game(config);

window.onresize = () => {
	game.renderer.resize(window.innerWidth, window.innerHeight);
	game.events.emit('resize');
};
