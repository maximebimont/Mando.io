export default class Map {
	width;
	height;
	nbBubbleMax = 50;
	bubbles = [];

	constructor(width, height) {
		this.width = width;
		this.height = height;
		for (let i = 0; i <= this.nbBubbleMax; i++) {
			this.bubbles[i] = new Bubble(
				Math.random() * this.width,
				Math.random() * this.height
			);
		}
	}
}
