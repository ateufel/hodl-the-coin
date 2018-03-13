import BaseState from './BaseState';
import Vehicle from '../sprites/Vehicle';
import Settings from '../services/UserData';
import MobileDetect from 'mobile-detect';
import Config from '../config';
import { Promise } from 'es6-promise';

let md = new MobileDetect(window.navigator.userAgent);
let mobileFactor = 1;
if (md.mobile()) {
	mobileFactor = 1.3;
}

class Game extends BaseState {
	constructor() {
		super();
		this.vehicle = undefined;
		this.isRunning = true;
		this.gameTimer = undefined;
		this.timeLeft = 60;
		this.txtScore = undefined;
		this.txtTimer = undefined;
		this.currentScore = 0;
	}

	preload() {
		super.preload();
		//this.game.load.image('wheel', 'img/vehicle/wheel.png');
		//this.game.load.image('vehicleBack', 'img/vehicle/vehicle-back.png');
		//this.game.load.image('vehicleFront', 'img/vehicle/vehicle-front.png');
		this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js');
	}

	create() {
		super.create();

		this.isRunning = true;
		this.timeLeft = 60;
		this.currentScore = 0;

		//vehicle
		/*this.vehicle = new Vehicle(this.game);
		this.vehicle.x = 400;
		this.vehicle.y = this.getWorldHeight() - 54;*/
		//score view
		let scoreBg = this.game.add.image(100, 80, 'scoreBg');
		scoreBg.anchor.setTo(0.5);
		this.txtScore = this.game.add.text(110, 75, this.currentScore.toString());
		this.txtScore.anchor.setTo(0.5);
		this.txtScore.font = 'Kavoon';
		this.txtScore.fontSize = 40;
		this.txtScore.stroke = '#000000';
		this.txtScore.strokeThickness = 4;
		this.txtScore.fill = '#ffffff';
		//timer view
		let timerBg = this.game.add.image(725, 90, 'timerBg');
		timerBg.anchor.setTo(0.5);
		this.txtTimer = this.game.add.text(644, 63, this.timeLeft, {font: '35px Arial', fill: '#fff', boundsAlignH: 'center'});
		this.txtTimer.setTextBounds(0, 0, 162, 100);

		//start game timer
		this.gameTimer = this.game.time.create(this.game);
		this.gameTimer.loop(1000, this.gameTimerTick, this);
		this.gameTimer.start();

		/*request
			.post(Config.serverPath + 'php/gameCounter.php')
			.end(() => {
				//do nothing
				//console.log('done');
			});*/
	}

	gameTimerTick() {
		this.timeLeft--;
		//update timer view
		this.txtTimer.setText(this.timeLeft);

		if (this.timeLeft === 0) {
			this.gameTimer.stop();
			this.isRunning = false;
			this.vehicle.isRunning = false;
			this.onGameOver();
		}
	}

	onGameOver() {
		//this.game.state.start('GameOver');
	}

	/*collisionHandler(obj1, obj2) {
		obj1.destroy();
	}*/

	update() {
		super.update();
		//this.game.physics.arcade.collide(firstItem, this.vehicle, this.collisionHandler, null, this);
		//this.game.physics.arcade.overlap(secondItem, this.vehicle, this.collisionHandler, null, this);
	}

	render() {
		//this.game.debug.spriteInfo(this.vehicle, 32, 32);
		//this.game.debug.bodyInfo(this.vehicle, 32, 32);
		//this.game.debug.body(this.vehicle);
	}
}

export default Game;
