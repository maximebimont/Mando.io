import Player from './player.js';
import Star from './star.js';
import Color from './color.js';

export default class Game {
	static width = 50;
	static height = 50;
	nbStarMax;
	stars = [];
	players = [];
	deadQueue = [];

	constructor(width, height) {
		Game.width = width;
		Game.height = height;
		this.nbStarMax = width * height * 0.02;
	}

	generateStars() {
		this.stars.push(
			new Star(
				Math.random() * Game.width - Game.width / 2,
				Math.random() * Game.height - Game.height / 2
			)
		);
	}

	join(socketId, name) {
		if (this.players.find(p => p.socketId == socketId) != undefined)
			return false;
		this.players.push(
			new Player(
				Math.random() * Game.width - Game.width / 2,
				Math.random() * Game.height - Game.height / 2,
				Color.getColor(),
				10,
				socketId,
				name
			)
		);
		return true;
	}

	disconnect(socketId) {
		const idx = this.players.findIndex(player => player.socketId == socketId);
		if (idx >= 0) this.players.splice(idx, 1);
	}

	update() {
		this.players.forEach(player => {
			player.update();
			for (let i = this.stars.length - 1; i >= 0; i--) {
				if (player.canEatStar(this.stars[i])) {
					this.stars.splice(i, 1);
				}
			}
		});
		for (let i = this.players.length - 1; i >= 0; i--) {
			for (const other of this.players) {
				if (
					this.players[i].socketId != other.socketId &&
					other.canEatStar(this.players[i])
				) {
					this.deadQueue.push(this.players[i].socketId);
					this.players.splice(i, 1);
					break;
				}
			}
		}

		if (this.stars.length <= this.nbStarMax) this.generateStars();
	}

	setDirection(socketId, x, y) {
		const p = this.players.find(p => p.socketId == socketId);
		if (p != undefined) p.setDirection(x, y);
	}
}
