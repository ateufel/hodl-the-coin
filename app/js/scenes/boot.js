import Phaser from 'phaser';

export class Boot extends Phaser.Scene {
	constructor () {
		super({
			key: 'Boot'
		});
	}
	preload () {
		//TODO preload boot assets here
	}
	create() {
		this.scene.start('Preloader');
	}
}
