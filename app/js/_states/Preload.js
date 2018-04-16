import BaseState from './BaseState';

class Preload extends BaseState {
	constructor() {
		super();
	}

	preload() {
		super.preload();
		this.load.image('test', 'img/test.png');
	}

	create() {
		super.create();
		this.state.start('Menu');
	}
}

export default Preload;
