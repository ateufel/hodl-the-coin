import Phaser from 'phaser';
import Config from '../config';
import {fbAddScore, fbGetUsers} from '../services/Firebase';

export default class Leaderboard extends Phaser.Scene {
	constructor () {
		super({
			key: 'Leaderboard'
		});
		this.screenWidth = null;
		this.screenHeight = null;
	}
	create(config) {
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		let txtHeadline = this.add.text(this.screenWidth / 2, 60, 'LEADERBOARD', Config.fonts.leaderboardHeadline).setOrigin(0.5);
		txtHeadline.setShadow(0, 4, Config.fonts.leaderboardHeadline.shadow, 0);

		let txtClose = this.add.text(this.screenWidth  - 25, 25, 'X', Config.fonts.leaderboardClose).setOrigin(0.5);
		txtClose.setInteractive();
		txtClose.on('clicked', () => {
			this.scene.start('Game');
		}, this);

		this.input.on('gameobjectup', (pointer, gameObject) => {
			gameObject.emit('clicked', gameObject);
		}, this);

		fbGetUsers().then((response) => {
			if (COIN && COIN === 'ardor') {
				this.showUsers(response);
				return;
			}
			if (!response.length || response[response.length - 1].score < config.score) {
				while(true) {
					let prompt = window.prompt('Congrats, you made it to the Leaderboard! Please enter your Steemit name', '');
					if (prompt === null) {
						//aborted
						break;
					}
					if (prompt && prompt.length) {
						fbAddScore(prompt, config.score);
						response.push({
							username: prompt,
							score: config.score
						});
						response.sort((a, b) => {
							return b.score - a.score;
						});
						break;
					}
				}
				this.showUsers(response);
			} else {
				this.showUsers(response);
			}
		});
	}
	showUsers(userArray) {
		userArray = userArray.slice(0, 10);
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		let lineGraphics = this.add.graphics({
			lineStyle: {width: 2, color: 0x4e3663}
		});
		const gap = (this.screenHeight - 170) / 10;
		for (let i = 0; i < (userArray.length - 1); i++) {
			lineGraphics.lineBetween(30, 143 + (gap / 2) + (gap * i), this.screenWidth - 30, 143 + (gap / 2) + (gap * i));
		}
		for (let i = 0; i < userArray.length; i++) {
			this.add.text(20, 143 + (gap * i), userArray[i].username, Config.fonts.leaderboardUserName).setOrigin(0, 0.5);
			this.add.text(this.screenWidth  - 20, 143 + (gap * i), userArray[i].score, Config.fonts.leaderboardUserScore).setOrigin(1, 0.5);
		}
	}
}
