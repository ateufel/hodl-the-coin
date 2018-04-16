import BaseState from './BaseState';

class Boot extends BaseState {
	constructor() {
		super();
	}

	init(data) {
		super.init(data);
		if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/FBAV/i)) {
			//this.game.scale.setGameSize(810, 930);
			//this.world.height = 900;
			//alert(this.world.height);
		} else {
			this.scale.scaleMode = Phaser.ScaleManager.RESIZE; //resize your window to see the stage resize too
			//this.scale.minWidth = 810;
			//this.scale.minHeight = 810;
			//this.scale.maxWidth = 810;
			//this.scale.maxHeight = 1100;
			this.scale.forceOrientation(false, true); //forceLandscape, forcePortrait
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			this.scale.windowConstraints.bottom = 'visual';
			this.scale.refresh();
		}
	}

	preload() {
		super.preload();
	}

	create() {
		super.create();
		this.state.start('Preload');
	}
}

export default Boot;
