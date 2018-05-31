import Phaser from 'phaser';

/**
 * This class is just for loading the loader image
 */
export default class Boot extends Phaser.Scene {
	constructor () {
		super({
			key: 'Boot'
		});
	}
	preload () {
		this.load.image('favicon', 'img/favicon_192.png');
	}
	create() {
		this.scene.start('Preloader');
	}
}
