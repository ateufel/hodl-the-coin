import Phaser from 'phaser';

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
		//this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'favicon').setOrigin(0.5);
		this.scene.start('Preloader');
	}
}
