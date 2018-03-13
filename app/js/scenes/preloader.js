import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
	constructor () {
		super({
			key: 'Preloader'
		});
	}
	preload () {
		//TODO preload assets here
	}
	create() {
		this.scene.start('Game');
	}
}
