import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'
import GameScene from './GameScene'


const config = {
	type: Phaser.AUTO, //AUTO / WEB GL By default 
	parent: 'app',
	width: 800, // width of the game screen
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }, // starting gravity
		},
	},
	scene: [GameScene, HelloWorldScene],// loaded based on priority 
}

export default new Phaser.Game(config)
