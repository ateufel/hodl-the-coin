export default class Pipe extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, `pipe_${config.type}`);
		config.scene.physics.world.enable(this);
		config.scene.add.existing(this);
		this.body.setVelocity(-250, 0);
		this.body.setOffset(0.5, this.height / 2);
		this.setOrigin(0.5, 0);
		this.setScale(6);
		this.type = config.type;
		this.isCounted = false;
	}
	update() {
		this.scene.physics.world.overlap(this, this.scene.player, this.handleHit);
		if (this.x < -this.body.width) {
			this.setVisible(false);
			this.setActive(false);
			this.destroy();
			return;
		}
		//detect if user passed pipe
		if (this.type === 'green' && !this.isCounted) {
			if ((this.x + this.body.width) < this.scene.player.x) {
				this.isCounted = true;
				this.scene.increaseScore();
			}
		}
	}
	handleHit = () => {
		if (this.scene.isGodMode) {
			return;
		}
		this.scene.gameOver();
	};
	stop = () => {
		this.body.setVelocity(0, 0);
	};
}
