export default class Coin extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, 'coin');
		config.scene.physics.world.enable(this);
		config.scene.add.existing(this);
		this.body.setCollideWorldBounds(true);
		this.body.setBounce(0, 0.7);
		this.body.setVelocity(0, 0);
		//this.body.setGravity(0, 2500);
		this.body.setSize(90, 90, true);
		this.body.setCircle(44);
		this.setOrigin(0.5);
		this.setScale(0.8);
		this.isDead = false;
		this.initialPosition = {
			x: config.x,
			y: config.y
		};
		this.config = config;

		if (!this.config.scene.anims.get('coinflap')) {
			const configPlayerAnimation = {
				key: 'coinflap',
				frames: this.config.scene.anims.generateFrameNumbers('coin', {start: 0, end: 4}),
				frameRate: 20,
				repeat: -1
			};
			this.config.scene.anims.create(configPlayerAnimation);
		}
		this.play('coinflap');
	}
	update() {

	}
	getHeight() {
		return this.body.height;
	}
	reset() {
		this.body.setVelocity(0, 0);
		this.body.setGravity(0, 0);
		this.setPosition(this.initialPosition.x, this.initialPosition.y);
		this.visible = true;
		this.angle = 15;
		this.isDead = false;
	}
	startGame() {
		this.body.setGravity(0, 2500);

		this.scene.input.on('pointerdown', () => {
			if (this.isDead || !this.scene.isRunning) {
				return;
			}
			this.body.setVelocity(0, -600);
			//increase frameRate for a tick
			this.config.scene.anims.get('coinflap').frameRate = 30;
			this.play('coinflap');
		});
	}
}
