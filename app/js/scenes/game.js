import Pipe from '../sprites/pipe';
import Coin from '../sprites/coin';
import Config from '../config';

/**
 * Main Game Scene
 */
export default class Game extends Phaser.Scene {
	constructor () {
		super({
			key: 'Game'
		});
		//hold the screen dimensions
		this.screenWidth = null;
		this.screenHeight = null;
		//instance variable for accessing the player object
		this.player = null;
		//array to hold all the existing pipes
		this.pipes = [];
		//score game object and score counter
		this.txtScore = null;
		this.currentScore = 0;
		//3d camera for the animated floor
		this.camera3D = null;
		//background elements, including the animated floor
		this.bgElements = [];
		//starting x position of background elements
		this.startX = 0;
		//boolean to check if game is running
		this.isRunning = false;
		//bg sound controller
		this.bgSound = null;
		//variable for god mode cheat
		this.isGodMode = false;
	}
	create() {
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		//tile sprite for the background clouds
		this.bgTile = this.add.tileSprite(0, 0, this.screenWidth, this.screenHeight, 'bg_sprite').setOrigin(0, 0).setAlpha(0.5).setDepth(-1000);

		//game group for background stars
		this.starGroup = this.add.group({key: 'star', frameQuantity: 15});
		//spread the group items randomly in a specific rectangle and randomly set alpha and size
		Phaser.Actions.RandomRectangle(this.starGroup.getChildren(), new Phaser.Geom.Rectangle(0, 0, this.screenWidth, this.screenHeight / 2));
		Phaser.Actions.SetAlpha(this.starGroup.getChildren(), 0.5, 0.5 / 15);
		Phaser.Actions.SetScale(this.starGroup.getChildren(), 0.5, 0.5, 0.2 / 15, 0.2 / 15);
		this.starGroup.children.entries.forEach(
			(sprite) => {
				this.physics.world.enable(sprite);
				//different moving speed, depending on the star alpha
				sprite.body.setVelocityX(-10 * sprite.alpha);
			}
		);

		//create 3d camera with animated floor elements
		this.camera3D = this.cameras3d.add(70).setPosition(0, -55, 200).setPixelScale(2048);
		this.bgElements = this.camera3D.createRect({x: 30, y: 1, z: 20}, 32, 'bg_ellipse');
		this.startX = this.bgElements[this.bgElements.length - 1].x;

		//create player object
		this.player = new Coin({
			scene: this,
			x: this.screenWidth / 2 + 100,
			y: 150
		});

		//add pipes group and timer to create new pipes
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

		//game over menu
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

		//general game object click handler
		this.input.on('gameobjectup', (pointer, gameObject) => {
			gameObject.emit('clicked', gameObject);
		}, this);

		//this.sys.game.events.on('resize', this.resize, this);
		this.events.once('shutdown', this.shutdown, this);

		if (!this.bgSound) {
			//if not started yet, start background sound in a loop
			this.bgSound = this.sound.add('theme', {loop: true}).play();
		}

		//god mode cheat :)
		this.input.keyboard.createCombo('iddqd');
	}
	//update function, gets called on a regular basis (ideally 60 times per second)
	update(time, delta) {
		this.bgTile.tilePositionX += delta * 0.03;
		this.starGroup.children.entries.forEach(
			(sprite) => {
				if (sprite.x < -sprite.width) {
					sprite.x = this.screenWidth;
				}
			}
		);

		//if game is not running (anymore) do no animate stuff
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

		//update sub-components
		this.pipes.children.entries.forEach(
			(sprite) => {
				sprite.update();
			}
		);
		this.player.update();
	}
	//add new pipes, will get called automatically with the timer callback
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
		//score should always be on top
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

		//keyboard handler for god mode cheat - only works on the main screen
		this.input.keyboard.on('keycombomatch', (event) => {
			this.isGodMode = true;
			alert('god mode on');
			this.cameras.main.flash(500);
		});
	}
	gameOver() {
		if (this.player.isDead || !this.isRunning) {
			return;
		}
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		//set game over parameters, show game over menu items and stop pipes
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

		this.groupGameOver.setDepth(1);
		this.txtPoweredBy.setDepth(1);

		//shake the camera for 500 milliseconds
		this.cameras.main.shake(500);
	}
	startGame() {
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
		if (COIN && COIN === 'ardor') {
			window.location.href = 'https://twitter.com/LimeSoda_at';
		} else {
			window.location.href = 'https://www.steemit.com/@limesoda';
		}
	}
	openLimeSoda() {
		window.location.href = 'https://www.limesoda.com';
	}
	showLeaderboard() {
		this.scene.start('Leaderboard', {score: this.currentScore});
	}
}
