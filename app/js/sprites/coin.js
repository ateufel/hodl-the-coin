export default class Coin extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, 'coin');
		config.scene.physics.world.enable(this);
		config.scene.add.existing(this);
		this.body.setCollideWorldBounds(true);
		this.body.setVelocity(0, 0);
		//this.body.setGravity(0, 2500);
		this.body.setSize(90, 90, true);
		this.body.setCircle(44);
		this.setOrigin(0.5);
		this.setScale(0.8);
		this.isDead = false;

		const configPlayerAnimation = {
			key: 'coinflap',
			frames: config.scene.anims.generateFrameNumbers('coin', {start: 0, end: 4}),
			frameRate: 20,
			repeat: -1
		};

		this.playerAnimation = config.scene.anims.create(configPlayerAnimation);
		this.play('coinflap');
	}
	update() {

	}
	getHeight() {
		return this.body.height;
	}
	startGame() {
		this.body.setGravity(0, 2500);

		this.scene.input.on('pointerdown', () => {
			if (this.isDead) {
				return;
			}
			this.body.setVelocity(0, -600);
			//increase frameRate for a tick
			this.playerAnimation.frameRate = 30;
			this.play('coinflap');
		});
	}
}
