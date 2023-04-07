import Cell from './cell.js';
import Vector from './vector.js';
import Game from './game.js';

export default class Player extends Cell {
	dir = new Vector(0, 0);
	name;
	score;
	speed;
	zoom;
	socketId;
	// image;
	// timer;

	constructor(x, y, color, score, socketId, name) {
		super(x, y, color, score);
		this.name = name;
		this.score = score;
		this.socketId = socketId;
		this.updateSpeed();
	}

	setDirection(x, y) {
		this.dir.x = x;
		this.dir.y = y;
	}

	update() {
		this.updateScore();
		this.updateZoom();
		this.updateSpeed();
		this.move();
	}

	updateScore() {
		const area = Math.PI * Math.pow(this.radius, 2);
		this.score = Math.floor(area);
	}

	updateSpeed() {
		this.speed = (2.2 * Math.pow(this.radius * 2, -0.43)) / 6;
	}

	updateZoom() {
		this.zoom = 48 / Math.sqrt(this.radius);
	}

	move() {
		const len = this.dir.length();
		const vec = this.dir.normalize();
		vec.multiply(this.speed);
		const displayRadius = this.radius * this.zoom;
		if (len < displayRadius) {
			vec.multiply(1 - (displayRadius - len) / displayRadius);
		}
		this.pos.add(vec);
		this.returnInMapIfIsOut();
	}

	eatStar(star) {
		const area = Math.PI * Math.pow(this.radius, 2);
		const cellArea = Math.PI * Math.pow(star.radius, 2);
		this.radius = Math.sqrt((area + cellArea) / Math.PI);
		this.updateSpeed();
	}

	canEatStar(star) {
		if (
			this.radius > this.pos.distance(star.pos) &&
			this.radius > star.radius * 1.1
		) {
			this.eatStar(star);
			return true;
		}
		return false;
	}

	returnInMapIfIsOut() {
		const radius30Percent = this.radius * 0.3;
		if (this.pos.x <= -Game.width / 2 + radius30Percent) {
			this.pos.x = -Game.width / 2 + radius30Percent;
		}
		if (this.pos.x >= Game.width / 2 - radius30Percent) {
			this.pos.x = Game.width / 2 - radius30Percent;
		}
		if (this.pos.y <= -Game.height / 2 + radius30Percent) {
			this.pos.y = -Game.height / 2 + radius30Percent;
		}
		if (this.pos.y >= Game.height / 2 - radius30Percent) {
			this.pos.y = Game.height / 2 - radius30Percent;
		}
	}
}
