class BaseState extends Phaser.State {
	constructor() {
		super();
		//this.bgFloor = undefined;
	}

	getWorldHeight() {
		//fallback for facebook app browser on ios
		if ((navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/FBAV/i)) || window.cordova) {
			return window.innerHeight + 700;
		} else {
			return this.world.height;
		}
	}

	init(data) {

	}

	preload() {

	}

	create() {

	}

	update() {

	}

	resize(width, height) {

	}

	shutdown() {

	}

	render() {
		/*this.game.debug.text(this.timesUp, 620, 208, 'rgb(0,255,0)');
		 this.game.debug.text(this.youWin, 620, 240, 'rgb(0,255,0)');

		 this.game.debug.text('Time: ' + this.myCountdownSeconds, 620, 15, 'rgb(0,255,0)');

		 this.game.debug.text('squareCounter: ' + this.squareCounter, 620, 272, 'rgb(0,0,255)');
		 this.game.debug.text('Matched Pairs: ' + this.masterCounter, 620, 304, 'rgb(0,0,255)');

		 this.game.debug.text('startList: ' + this.myString1, 620, 208, 'rgb(255,0,0)');
		 this.game.debug.text('squareList: ' + this.myString2, 620, 240, 'rgb(255,0,0)');

		 this.game.debug.text('Tile:'+ this.map.getTile(this.layer.getTileX(this.marker.x), this.layer.getTileY(this.marker.y)).index, 620, 48, 'rgb(255,0,0)');
		 this.game.debug.text('LayerX: ' + this.layer.getTileX(this.marker.x), 620, 80, 'rgb(255,0,0)');
		 this.game.debug.text('LayerY: ' + this.layer.getTileY(this.marker.y), 620, 112, 'rgb(255,0,0)');
		 this.game.debug.text('Tile Position: ' + this.currentTilePosition, 620, 144, 'rgb(255,0,0)');
		 this.game.debug.text('Hidden Tile: ' + this.getHiddenTile(), 620, 176, 'rgb(255,0,0)');*/
	}
}

export default BaseState;
