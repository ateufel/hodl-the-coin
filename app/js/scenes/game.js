import Pipe from '../sprites/pipe';
import Coin from '../sprites/coin';
import Config from '../config';

export default class Game extends Phaser.Scene {
	constructor () {
		super({
			key: 'Game'
		});
		this.graphics = null;
		this.screenWidth = null;
		this.screenHeight = null;
		this.player = null;
		this.background = null;
		this.pipes = [];
		this.txtScore = null;
		this.currentScore = 0;
		this.camera3D = null;
		this.bgElements = [];
		this.startX = 0;
		this.isRunning = false;
	}
	preload () {
		this.load.image('background', 'img/background.png');
		this.load.image('pipe_green', 'img/pipe_green.png');
		this.load.image('pipe_red', 'img/pipe_red.png');
		this.load.image('bg_ellipse', 'img/ellipse_glow.png');
		this.load.spritesheet('coin', 'img/coin.png', {frameWidth: 200, frameHeight: 88});
	}
	create() {
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		this.graphics = this.add.graphics({
			lineStyle: {width: 4, color: 0xff0000},
			fillStyle: {color: 0xffffff}
		});

		//create 3d camera with animated floor elements
		this.camera3D = this.cameras3d.add(70).setPosition(0, -55, 200).setPixelScale(2048);
		this.bgElements = this.camera3D.createRect({x: 30, y: 1, z: 20}, 32, 'bg_ellipse');
		this.startX = this.bgElements[this.bgElements.length - 1].x;

		this.player = new Coin({
			scene: this,
			x: this.screenWidth * 0.2,
			y: this.screenHeight * 0.3
		});

		this.pipes = this.add.group();
		this.timedEvent = this.time.addEvent({
			delay: 1500,
			callback: this.addPipes,
			callbackScope: this,
			loop: true
		});

		this.txtScore = this.add.text(this.screenWidth / 2, 60, '0', Config.fonts.score);
		this.txtScore.setShadow(0, 4, '#e79617', 0);
		this.txtScore.setOrigin(0.5);
		this.txtScore.visible = false;
		this.txtStartGame = this.add.text(this.screenWidth / 2, this.screenHeight / 2, 'TAP TO START', Config.fonts.tapToStart);
		this.txtStartGame.setShadow(0, 4, '#e79617', 0);
		this.txtStartGame.setOrigin(0.5);
		this.txtStartGame.setInteractive();
		this.txtStartGame.on('clicked', this.startGame, this);

		this.input.on('gameobjectup', (pointer, gameObject) => {
			gameObject.emit('clicked', gameObject);
		}, this);

		//this.sys.game.events.on('resize', this.resize, this);
		this.events.once('shutdown', this.shutdown, this);
	}
	update(time, delta) {
		//TODO do stuff while not running

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

		//TODO this does not work, use world collide event?
		/*if(this.player.y > this.cameras.main.height) {
			this.gameOver();
		}*/
	}
	/*resize() {
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		/!*if (!this.background) {
			this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
			this.background.displayWidth = this.screenWidth;
			this.background.displayHeight = this.screenHeight * 0.66;
		} else {
			//TODO set background size
			//this.background
		}*!/

		this.player.x = this.screenWidth * 0.2;
		this.player.y = this.screenHeight * 0.5;
	}*/
	addPipes() {
		if (!this.isRunning) {
			return;
		}
		//set pipe gap big enough for the player/coin
		const pipeGap = this.player.getHeight() * 5;
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
	shutdown() {
		this.sys.game.events.off('resize', this.resize, this);
	}
	gameOver() {
		if (this.player.isDead) {
			return;
		}
		//alert('game over');
		//this.player.isDead = true;
		/*this.pipes.children.entries.forEach(
			(sprite) => {
				sprite.stop();
			}
		);*/
	}
	startGame() {
		//TODO remove menu items with animation
		//TODO rotate and move player coin to initial position for game
		//TODO start game (isRunning = true) to scroll background and create pipes
		this.player.startGame();
		this.isRunning = true;
		this.txtScore.visible = true;
		this.txtStartGame.visible = false;
	}
}
