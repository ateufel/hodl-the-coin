import BaseState from './BaseState';
//import Overlay from '../misc/Overlay';

class Menu extends BaseState {
	constructor() {
		super();
		this.test = undefined;
	}

	preload() {
		super.preload();
	}

	create() {
		super.create();

		//buttons
		//this.test = this.game.add.button(this.world.width / 2 - this.game.cache.getImage('buttonStart').width / 2, 260, 'buttonStart', this.onStartClick.bind(this));
		this.test = this.add.image(this.world.centerX, this.world.centerY, 'test');
		this.test.anchor.setTo(0.5);
		this.test.scale.setTo(0.1);
	}

	resize(width, height) {
		super.resize(width, height);
		this.test.x = this.world.centerX;
		this.test.y = this.world.centerY;
	}

	update() {
		//super.update();
	}

	render() {

	}

	/*onStartClick() {
		this.game.state.start('Game', true, false);
	}

	onPricesClick() {
		//show overlay
		new Overlay('prices');
	}*/
}

export default Menu;
