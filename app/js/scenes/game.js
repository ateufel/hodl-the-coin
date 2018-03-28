import Pipe from '../sprites/pipe';
import Coin from '../sprites/coin';

export default class Game extends Phaser.Scene {
	constructor () {
		super({
			key: 'Game'
		});
		this.graphics = null;
		/*this.lines = [];
		this.horizontalLines = [];
		this.rectOverlay = null;
		this.lineCount = 20;*/
		this.screenWidth = null;
		this.screenHeight = null;
		//this.rotationPoint = null;
		this.player = null;
		this.background = null;
		this.pipes = [];
		this.txtScore = null;
		this.currentScore = 0;
		this.camera3D = null;
		this.bgElements = [];
		this.startX = 0;
	}
	preload () {
		this.load.image('background', 'img/background.png');
		this.load.image('pipe_green', 'img/pipe_green.png');
		this.load.image('pipe_red', 'img/pipe_red.png');
		this.load.image('bg_ellipse', 'img/ellipse.png');
		this.load.spritesheet('coin', 'img/coin.png', {frameWidth: 200, frameHeight: 88});
	}
	create() {
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;

		this.graphics = this.add.graphics({
			lineStyle: {width: 4, color: 0xff0000},
			fillStyle: {color: 0xffffff}
		});

		this.camera3D = this.cameras3d.add(60).setPosition(0, -60, 200).setPixelScale(1024);
		//const test = this.camera3D.create(0, 0, 0, 'bg_ellipse');
		this.bgElements = this.camera3D.createRect({x: 10, y: 1, z: 20}, 32, 'bg_ellipse');
		for (let i = 0; i < this.bgElements.length; i++) {
			this.bgElements[i].gameObject.setBlendMode(Phaser.BlendModes.ADD);
		}
		this.startX = this.bgElements[this.bgElements.length - 1].x;

		this.resize();
		this.pipes = this.add.group();
		this.timedEvent = this.time.addEvent({
			delay: 1500,
			callback: this.addPipes,
			callbackScope: this,
			loop: true
		});

		const configText = {
			x: 20,
			y: 20,
			text: '0',
			style: {
				font: '64px Arial',
				fill: '#ffffff',
				align: 'left'
			}
		};

		this.txtScore = this.make.text(configText);

		this.sys.game.events.on('resize', this.resize, this);
		this.events.once('shutdown', this.shutdown, this);
	}
	update(time, delta) {
		//this.camera3D.x += delta / 5;

		for (let i = 0; i < this.bgElements.length; i++) {
			let segment = this.bgElements[i];
			segment.x -= delta / 5;
			if (segment.x < (this.camera3D.x + 32)) {
				segment.x = this.startX;
			}
		}

		/*if (this.player.isDead) {
			return;
		}*/
		/*this.graphics.clear();

		for (let i = 0; i < this.lineCount; i++) {
			this.graphics.strokeLineShape(this.lines[i]);
			Phaser.Geom.Line.RotateAroundPoint(this.lines[i], this.rotationPoint, 0.008);
		}
		for (let i = 0; i < 7; i++) {
			this.graphics.strokeLineShape(this.horizontalLines[i]);
		}

		this.graphics.fillRectShape(this.rectOverlay);*/

		this.pipes.children.entries.forEach(
			(sprite) => {
				sprite.update();
			}
		);

		//TODO this does not work, use world collide event?
		/*if(this.player.y > this.cameras.main.height) {
			this.gameOver();
		}*/
	}
	resize() {
		this.screenWidth = this.sys.canvas.width;
		this.screenHeight = this.sys.canvas.height;
		//this.rotationPoint = {x: this.screenWidth / 2, y: this.screenHeight / 4};
		//this.lines = [];
		//this.horizontalLines = [];

		//this.physics.world.setBounds(0, 0, this.screenWidth * 1000, this.screenHeight);

		/*for (let i = 0; i < this.lineCount; i++) {
			this.lines.push(new Phaser.Geom.Line(this.screenWidth / 2, this.screenHeight / 3, this.screenWidth / 2, this.screenHeight * 2));
			Phaser.Geom.Line.RotateAroundPoint(this.lines[i], this.rotationPoint, i * (Phaser.Math.PI2 / this.lineCount));
		}
		for (let i = 0; i < 7; i++) {
			let yDelta = i * this.screenHeight / 10;
			yDelta = yDelta / (i + 1) * 4;
			this.horizontalLines.push(new Phaser.Geom.Line(0, this.screenHeight - yDelta, this.screenWidth, this.screenHeight - yDelta));
		}
		this.rectOverlay = new Phaser.Geom.Rectangle(0, 0, this.screenWidth, this.screenHeight * 0.66);

		if (!this.background) {
			this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
			this.background.displayWidth = this.screenWidth;
			this.background.displayHeight = this.screenHeight * 0.66;
		} else {
			//TODO set background size
			//this.background
		}*/

		if (!this.player) {
			this.player = new Coin({
				scene: this,
				x: this.screenWidth * 0.2,
				y: this.screenHeight * 0.5
			});
		} else {
			this.player.x = this.screenWidth * 0.2;
			this.player.y = this.screenHeight * 0.5;
		}
	}
	addPipes() {
		const pipeGap = this.screenHeight / 2.5;
		const yPipe = Math.random() * (this.screenHeight - 390 - pipeGap - 390);

		this.pipes.add(new Pipe({
			scene: this,
			type: 'red',
			x: this.screenWidth,
			//y: 0,
			y: yPipe
		}));
		this.pipes.add(new Pipe({
			scene: this,
			type: 'green',
			x: this.screenWidth,
			//y: 390 + pipeGap
			y: yPipe + 390 + pipeGap
		}));
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
		alert('game over');
		this.player.isDead = true;
		/*this.pipes.children.entries.forEach(
			(sprite) => {
				sprite.stop();
			}
		);*/
	}
}
