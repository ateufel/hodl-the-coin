import Pipe from '../sprites/pipe';
import Coin from '../sprites/coin';
import Config from '../config';
import Facebook from '../services/Facebook';

export default class Game extends Phaser.Scene {
	constructor () {
		super({
			key: 'Game'
		});
		this.screenWidth = null;
		this.screenHeight = null;
		this.player = null;
		this.pipes = [];
		this.txtScore = null;
		this.currentScore = 0;
		this.camera3D = null;
		this.bgElements = [];
		this.startX = 0;
		this.isRunning = false;
		this.bgSound = null;
		this.lines = [];
	}
	create() {
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		this.bgTile = this.add.tileSprite(0, 0, this.screenWidth, this.screenHeight, 'bg_sprite').setOrigin(0, 0).setAlpha(0.5).setDepth(-1000);

		this.starGroup = this.add.group({key: 'star', frameQuantity: 15});
		Phaser.Actions.RandomRectangle(this.starGroup.getChildren(), new Phaser.Geom.Rectangle(0, 0, this.screenWidth, this.screenHeight / 2));
		Phaser.Actions.SetAlpha(this.starGroup.getChildren(), 0.5, 0.5 / 15);
		Phaser.Actions.SetScale(this.starGroup.getChildren(), 0.5, 0.5, 0.2 / 15, 0.2 / 15);
		this.starGroup.children.entries.forEach(
			(sprite) => {
				this.physics.world.enable(sprite);
				sprite.body.setVelocityX(-10 * sprite.alpha);
			}
		);

		//create 3d camera with animated floor elements
		this.camera3D = this.cameras3d.add(70).setPosition(0, -55, 200).setPixelScale(2048);
		this.bgElements = this.camera3D.createRect({x: 30, y: 1, z: 20}, 32, 'bg_ellipse');
		this.startX = this.bgElements[this.bgElements.length - 1].x;

		//for the lines
		this.graphics = this.add.graphics({lineStyle: {width: 4, color: 0xffffff, alpha: 1}});

		this.player = new Coin({
			scene: this,
			x: this.screenWidth / 2 + 100,
			y: 150
		});

		this.pipes = this.add.group();
		this.timedEvent = this.time.addEvent({
			delay: 1500,
			callback: this.addPipes,
			callbackScope: this,
			loop: true
		});

		//score view
		this.txtScore = this.add.text(this.screenWidth / 2, 60, '0', Config.fonts.score);
		this.txtScore.setShadow(0, 4, Config.fonts.score.shadow, 0);
		this.txtScore.setOrigin(0.5);
		this.txtScore.visible = false;

		//start menu
		this.headline = this.add.image(this.screenWidth / 2, 150, 'headline');
		this.headline.setScale(0.4);
		this.txtStartGame = this.add.text(this.screenWidth / 2, this.screenHeight / 2, 'TAP TO START', Config.fonts.tapToStart);
		this.txtStartGame.setShadow(0, 4, Config.fonts.tapToStart.shadow, 0);
		this.txtStartGame.setOrigin(0.5);
		this.txtStartGame.setInteractive();
		this.txtStartGame.on('clicked', this.startGame, this);
		this.txtLikeGame = this.add.text(this.screenWidth / 2, this.screenHeight - 200, 'LIKE THIS GAME?', Config.fonts.likeGame);
		this.txtLikeGame.setShadow(0, 4, Config.fonts.likeGame.shadow, 0);
		this.txtLikeGame.setOrigin(0.5);
		this.txtLikeGame.setInteractive();
		this.txtLikeGame.on('clicked', this.openSteemit, this);
		if (COIN && COIN === 'ardor') {
			this.txtFollowSteemit = this.add.text(this.screenWidth / 2, this.screenHeight - 150, 'FOLLOW US ON TWITTER', Config.fonts.followSteemit);
		} else {
			this.txtFollowSteemit = this.add.text(this.screenWidth / 2, this.screenHeight - 150, 'FOLLOW US ON STEEMIT', Config.fonts.followSteemit);
		}
		this.txtFollowSteemit.setShadow(0, 2, Config.fonts.followSteemit.shadow, 0);
		this.txtFollowSteemit.setOrigin(0.5);
		this.txtFollowSteemit.setInteractive();
		this.txtFollowSteemit.on('clicked', this.openSteemit, this);
		//start menu group
		this.groupStartMenu = this.add.group();
		this.groupStartMenu.add(this.headline);
		this.groupStartMenu.add(this.txtStartGame);
		this.groupStartMenu.add(this.txtLikeGame);
		this.groupStartMenu.add(this.txtFollowSteemit);

		//game over
		let rectOverlay = this.add.graphics({fillStyle: {color: 0x000000}});
		rectOverlay.fillRectShape(new Phaser.Geom.Rectangle(0, 0, this.screenWidth, this.screenHeight));
		rectOverlay.alpha = 0.8;
		this.gameover = this.add.image(this.screenWidth / 2, 150, 'gameover');
		this.gameover.setScale(0.4);
		this.txtGameOverScoreMeta = this.add.text(this.screenWidth / 2 - 10, 250, 'SCORE', Config.fonts.gameOverScoreMeta);
		this.txtGameOverScoreMeta.setShadow(0, 4, Config.fonts.gameOverScoreMeta.shadow, 0);
		this.txtGameOverScoreMeta.setOrigin(1, 0);
		this.txtGameOverScore = this.add.text(this.screenWidth / 2 + 10, 250, '0', Config.fonts.gameOverScoreValues);
		this.txtGameOverScore.setShadow(0, 4, Config.fonts.gameOverScoreValues.shadow, 0);
		this.txtGameOverScore.setOrigin(0, 0);
		let buttonRestart = this.add.sprite(this.screenWidth / 2, 350, 'restart', 1).setInteractive().setScale(0.5);
		buttonRestart.on('pointerover', () => {
			buttonRestart.setFrame(0);
		}, this);
		buttonRestart.on('pointerout', () => {
			buttonRestart.setFrame(1);
		}, this);
		buttonRestart.on('pointerdown', this.showStartMenu, this);
		if (!COIN) {
			this.buttonLeaderboard = this.add.sprite(this.screenWidth / 2, 400, 'leaderboard', 1).setInteractive().setScale(0.5);
			this.buttonLeaderboard.on('pointerover', () => {
				this.buttonLeaderboard.setFrame(0);
			}, this);
			this.buttonLeaderboard.on('pointerout', () => {
				this.buttonLeaderboard.setFrame(1);
			}, this);
			this.buttonLeaderboard.on('pointerdown', this.showLeaderboard, this);
		}
		//game over group
		this.groupGameOver = this.add.group();
		this.groupGameOver.add(rectOverlay);
		this.groupGameOver.add(this.gameover);
		this.groupGameOver.add(this.txtGameOverScoreMeta);
		this.groupGameOver.add(this.txtGameOverScore);
		this.groupGameOver.add(buttonRestart);
		if (this.buttonLeaderboard) {
			this.groupGameOver.add(this.buttonLeaderboard);
		}
		this.groupGameOver.children.entries.forEach(
			(sprite) => {
				sprite.visible = false;
			}
		);

		//general menu stuff
		this.txtPoweredBy = this.add.text(this.screenWidth / 2, this.screenHeight - 50, 'POWERED BY LIMESODA', Config.fonts.poweredBy);
		this.txtPoweredBy.setOrigin(0.5);
		this.txtPoweredBy.setInteractive();
		this.txtPoweredBy.on('clicked', this.openLimeSoda, this);

		this.showStartMenu();

		this.input.on('gameobjectup', (pointer, gameObject) => {
			gameObject.emit('clicked', gameObject);
		}, this);

		//this.sys.game.events.on('resize', this.resize, this);
		this.events.once('shutdown', this.shutdown, this);

		if (!this.bgSound) {
			this.bgSound = this.sound.add('theme', {loop: true}).play();
		}
	}
	update(time, delta) {
		this.bgTile.tilePositionX += delta * 0.03;
		this.starGroup.children.entries.forEach(
			(sprite) => {
				if (sprite.x < -sprite.width) {
					sprite.x = this.screenWidth;
				}
			}
		);

		if (!this.isRunning) {
			return;
		}

		//animate background - TODO: put this in a separate background class
		for (let i = 0; i < this.bgElements.length; i++) {
			let segment = this.bgElements[i];
			segment.x -= 0.6;
			if (segment.x <= -this.startX) {
				segment.x = this.startX;
			}
		}

		//move this.lines to the left
		this.graphics.clear();
		for(let i = 0; i < this.lines.length; i++) {
			Phaser.Geom.Line.Offset(this.lines[i], -delta * 0.25, 0);
			if (this.lines[i].y1 > this.lines[i].y2) {
				this.graphics.lineStyle(4, 0x49ff8d);
			} else {
				this.graphics.lineStyle(4, 0xff4a7c);
			}
			this.graphics.strokeLineShape(this.lines[i]);
		}

		//update sub-components
		this.pipes.children.entries.forEach(
			(sprite) => {
				sprite.update();
			}
		);
		this.player.update();
	}
	addLine() {
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		let line;
		if (this.lines.length) {
			line = new Phaser.Geom.Line(this.lines[this.lines.length - 1].x2, this.lines[this.lines.length - 1].y2, this.player.x, this.player.y);
		} else {
			if (Math.ceil(this.player.x) <= Math.ceil(this.screenWidth * 0.3)) {
				line = new Phaser.Geom.Line(0, this.screenHeight / 2, this.player.x, this.player.y);
			} else {
				return;
			}
		}
		this.lines.push(line);
		this.graphics.clear();
		for(let i = 0; i < this.lines.length; i++) {
			if(this.lines[i].right < 0) {
				this.lines.splice(i--, 1);
			}
			else {
				if (this.lines[i].y1 >this.lines[i].y2) {
					this.graphics.lineStyle(4, 0x49ff8d);
				} else {
					this.graphics.lineStyle(4, 0xff4a7c);
				}
				this.graphics.strokeLineShape(this.lines[i]);
			}
		}
	}
	addPipes() {
		if (!this.isRunning) {
			return;
		}
		//set pipe gap big enough for the player/coin
		const pipeGap = this.player.getHeight() * 4;
		const yPipe = (Math.random() * (this.screenHeight -  pipeGap)) - 732;

		//add 2 pipes
		this.pipes.add(new Pipe({
			scene: this,
			type: 'red',
			x: this.screenWidth,
			y: yPipe
		}));
		this.pipes.add(new Pipe({
			scene: this,
			type: 'green',
			x: this.screenWidth,
			y: yPipe + 732 + pipeGap
		}));
		this.txtScore.setDepth(1);
	}
	increaseScore() {
		if (!this.player.isDead) {
			this.currentScore++;
			this.txtScore.setText(this.currentScore);
		}
	}
	showStartMenu() {
		this.player.reset();
		this.player.setDepth(1);
		//show start menu group
		this.groupStartMenu.children.entries.forEach(
			(sprite) => {
				sprite.visible = true;
			}
		);
		//clear gameover group
		this.groupGameOver.children.entries.forEach(
			(sprite) => {
				sprite.visible = false;
			}
		);
		//clear pipes
		while (this.pipes.children.entries.length) {
			this.pipes.getFirstAlive().destroy();
		}

		this.input.keyboard.createCombo('iddqd');
		this.input.keyboard.on('keycombomatch', (event) => {
			//TODO god mode
		});
	}
	shutdown() {
		this.sys.game.events.off('resize', this.resize, this);
	}
	gameOver() {
		if (this.player.isDead || !this.isRunning) {
			return;
		}
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		this.player.isDead = true;
		this.isRunning = false;
		this.pipes.children.entries.forEach(
			(sprite) => {
				sprite.stop();
			}
		);
		this.txtGameOverScore.setText(this.currentScore + ' days');
		this.groupGameOver.children.entries.forEach(
			(sprite) => {
				sprite.visible = true;
			}
		);
		this.txtPoweredBy.visible = true;
		this.txtScore.visible = false;
		this.player.visible = false;

		this.graphics.clear();
		this.lines = [];

		this.groupGameOver.setDepth(1);
		this.txtPoweredBy.setDepth(1);
	}
	startGame() {
		Facebook.log('startGame');

		//TODO remove menu items with animation and then start game (after a small timeout)
		this.tweens.add({
			targets: this.player,
			x: this.screenWidth * 0.3,
			angle: 0,
			ease: 'Quad.easeOut',
			duration: 500,
			repeat: 0
		});

		this.currentScore = 0;
		this.txtScore.setText(this.currentScore);
		this.txtScore.visible = true;
		this.player.startGame();
		this.isRunning = true;
		this.txtPoweredBy.visible = false;

		this.groupStartMenu.children.entries.forEach(
			(sprite) => {
				sprite.visible = false;
			}
		);

		this.input.keyboard.off('keycombomatch');
	}
	openSteemit() {
		Facebook.log('openSteemit');
		if (COIN && COIN === 'ardor') {
			window.location.href = 'https://twitter.com/LimeSoda_at';
		} else {
			window.location.href = 'https://www.steemit.com/@limesoda';
		}
	}
	openLimeSoda() {
		Facebook.log('openLimeSoda');
		window.location.href = 'https://www.limesoda.com';
	}
	showLeaderboard() {
		Facebook.log('showLeaderboard');
		this.scene.start('Leaderboard', {score: this.currentScore});
	}
}
