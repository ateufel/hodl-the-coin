import Phaser from 'phaser';
import Config from '../config';

export default class Leaderboard extends Phaser.Scene {
	constructor () {
		super({
			key: 'Leaderboard'
		});
		this.screenWidth = null;
		this.screenHeight = null;
	}
	create() {
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		let txtHeadline = this.add.text(this.screenWidth / 2, 60, 'LEADERBOARD', Config.fonts.leaderboardHeadline).setOrigin(0.5);
		txtHeadline.setShadow(0, 4, Config.fonts.leaderboardHeadline.shadow, 0);

		let txtClose = this.add.text(this.screenWidth  - 25, 25, 'X', Config.fonts.leaderboardClose).setOrigin(0.5);
		txtClose.setInteractive();
		txtClose.on('clicked', () => {
			this.scene.start('Game');
		}, this);

		let lineGraphics = this.add.graphics({
			lineStyle: {width: 2, color: 0x4e3663}
		});

		const gap = (this.screenHeight - 170) / 10;
		for (let i = 0; i < 9; i++) {
			lineGraphics.lineBetween(30, 170 + (gap * i), this.screenWidth - 30, 170 + (gap * i));
		}
		for (let i = 0; i < 10; i++) {
			this.add.text(20, 143 + (gap * i), `USER ${i + 1}`, Config.fonts.leaderboardUserName).setOrigin(0, 0.5);
			this.add.text(this.screenWidth  - 20, 143 + (gap * i), `${100 - i}`, Config.fonts.leaderboardUserScore).setOrigin(1, 0.5);
		}

		this.input.on('gameobjectup', (pointer, gameObject) => {
			gameObject.emit('clicked', gameObject);
		}, this);
	}
}
