import Phaser from 'phaser';
import Preloader from './scenes/preloader';
import Game from './scenes/game';
import styles from '../css/main.css';

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
		Preloader,
		Game
	],
	antialias: false,
	pixelArt: true,
	fps: 60
};
const game =  new Phaser.Game(config);

window.onresize = () => {
	game.renderer.resize(window.innerWidth, window.innerHeight);
	game.events.emit('resize');
};
