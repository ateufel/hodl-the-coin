class Vehicle extends Phaser.Sprite {
	constructor(game) {
		super(game, 0, 0);
		this.vehicleBack = this.game.add.sprite(0, -19, 'vehicleBack');
		this.vehicleBack.anchor.setTo(0.5, 0.5);
		this.vehicleFront = this.game.add.sprite(0, 0, 'vehicleFront');
		this.vehicleFront.anchor.setTo(0.5, 0.5);
		this.wheel1 = this.game.add.sprite(38, 24, 'wheel');
		this.wheel1.anchor.setTo(0.5, 0.5);
		this.wheel2 = this.game.add.sprite(-43, 24, 'wheel');
		this.wheel2.anchor.setTo(0.5, 0.5);
		this.isRunning = true;

		this.addChild(this.vehicleBack);
		this.addChild(this.vehicleFront);
		this.addChild(this.wheel1);
		this.addChild(this.wheel2);

		this.game.physics.arcade.enable(this);
		this.body.maxVelocity.x = 300; //max speed
		this.body.drag.x = 200; //friction
		this.body.collideWorldBounds = true;
		this.body.bounce.setTo(0.5);
		this.body.setSize(120, 75, -60, -20);
		this.body.immovable = true;

		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.game.stage.addChild(this);
	}

	update() {
		super.update();

		if ((this.cursors.left.isDown) && this.isRunning) {
			this.accelerateLeft();
		} else if ((this.cursors.right.isDown) && this.isRunning) {
			this.accelerateRight();
		} else {
			this.stopAcceleration();
		}

		let wheelVelocity;
		if (this.body.acceleration.x) {
			wheelVelocity = this.body.acceleration.x * 0.01;
		} else {
			wheelVelocity = this.body.velocity.x * 0.01;
		}
		this.wheel1.rotation += 0.1 * wheelVelocity;
		this.wheel2.rotation += 0.1 * wheelVelocity;
	}

	accelerateLeft() {
		this.body.acceleration.x = -300;
	}

	accelerateRight() {
		this.body.acceleration.x = 300;
	}

	stopAcceleration() {
		this.body.acceleration.x = 0;
	}
}

export default Vehicle;
