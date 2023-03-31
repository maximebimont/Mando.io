import colors from './colors.js';

export default class Bubble {
	color;
	x;
	y;

	constructor(x, y) {
		this.color = colors[Math.floor(Math.random() * colors.length)];
		this.x = x;
		this.y = y;
	}
}
