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
		this.scene.start('Preloader');
	}
}
