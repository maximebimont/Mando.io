import Vector from './vector.js';

export default class Cell {
	pos;
	radius;
	color;

	constructor(x, y, color, score) {
		this.pos = new Vector(x, y);
		this.color = color;
		this.radius = Math.sqrt(score / Math.PI);
	}
}
