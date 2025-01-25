import Phaser from 'phaser'

const GROUND_KEY = 'ground'
const DUDE_KEY = 'dude'
const STAR_KEY = 'star'
const BOMB_KEY = 'bomb'


export default class GameScene extends Phaser.Scene {
	constructor() {
        
        super("game scene") // unique key to help figure out the scene by parent
        this.player = undefined;
        this.platforms = undefined;
		this.cursors = undefined;
    }

	preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image(GROUND_KEY, 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
		this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet(DUDE_KEY, 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
	}

	create() {

        this.createPlatforms();
        this.createPlayer();
        this.physics.add.collider(this.player, this.platforms);
		this.cursors = this.input.keyboard.createCursorKeys()
		const stars = this.createStars();
		this.physics.add.collider(stars, this.platforms)
		//overlap(object1, object2 [, collideCallback] [, processCallback boolean] [, callbackContext])
		this.physics.add.overlap(this.player, stars, this.collectStar, null, this)


	}

	collectStar(player, star){
		console.log("star collected")
		// hide, disable the star
		star.disableBody(true, true)
	}

	createStars(){
		// Creates 12 stars evenly spaced by 70 pixels
		const stars = this.physics.add.group({
			key: STAR_KEY,
			repeat: 11,
			setXY: { x: 12, y: 0, stepX: 70 }
		})

		stars.children.iterate((child) => {
			// bounce on first impact 	
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5))
		})

		return stars
	}

	update() {
		if (this.cursors.left.isDown)
			{
				this.player.setVelocityX(-160)
	
				this.player.anims.play('left', true)
			}
			else if (this.cursors.right.isDown)
			{
				this.player.setVelocityX(160)
	
				this.player.anims.play('right', true)
			}
			else
			{
				this.player.setVelocityX(0)
	
				this.player.anims.play('turn')
			}
	
			if (this.cursors.up.isDown && this.player.body.touching.down)
			{
				this.player.setVelocityY(-330)
			}
	}

    createPlatforms(){
        this.platforms = this.physics.add.staticGroup()

		this.platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()
		this.platforms.create(600, 400, GROUND_KEY)
		this.platforms.create(50, 250, GROUND_KEY)
		this.platforms.create(750, 220, GROUND_KEY)
    }

    createPlayer()
	{
		this.player = this.physics.add.sprite(100, 450, DUDE_KEY)
		this.player.setBounce(0.2)
		this.player.setCollideWorldBounds(true)

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		})
		
		this.anims.create({
			key: 'turn',
			frames: [ { key: DUDE_KEY, frame: 4 } ],
			frameRate: 20
		})
		
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		})
	}

}
