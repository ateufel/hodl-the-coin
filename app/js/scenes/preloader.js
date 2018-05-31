import Phaser from 'phaser';

/**
 * Preloader Scene
 */
export default class Preloader extends Phaser.Scene {
	constructor () {
		super({
			key: 'Preloader'
		});
	}
	preload () {
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		const favicon = this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'favicon').setOrigin(0.5);

		//preload all assets for the game
		const progress = this.add.graphics();
		this.load.on('progress', (value) => {
			progress.clear();
			progress.fillStyle(0xffffff, 0.5);
			progress.fillRect(favicon.x - favicon.width / 2, favicon.y + favicon.height / 2 + 20, favicon.width * value, 3);
		});
		this.load.on('complete', () => {
			progress.destroy();
			this.scene.start('Game');
		});
		this.load.image('pipe_green', 'img/pipe_green.png');
		this.load.image('pipe_red', 'img/pipe_red.png');
		this.load.image('bg_ellipse', 'img/ellipse_glow.png');
		this.load.image('headline', 'img/headline.png');
		this.load.image('gameover', 'img/gameover.png');
		this.load.image('star', 'img/star.png');
		this.load.image('bg_sprite', 'img/bg_tileable.gif');
		this.load.spritesheet('restart', 'img/restart_sprites.png', {frameWidth: 250, frameHeight: 80});
		//this.load.spritesheet('share', 'img/share_sprites.png', {frameWidth: 250, frameHeight: 80});
		this.load.spritesheet('leaderboard', 'img/leaderboard_sprites.png', {frameWidth: 394, frameHeight: 80});
		this.load.spritesheet('coin', `img/coin_${COIN || 'steemit'}.png`, {frameWidth: 200, frameHeight: 88});
		this.load.audio('theme', [
			'audio/music_main.mp3'
		]);
		this.load.audio('beep', [
			'audio/beep.mp3'
		]);
	}
}
