export default class Map {
	width = 900;
	height = 900;
	nbStarMax = 50;
	stars = [];

	constructor(width, height) {
		this.width = width;
		this.height = height;
		for (let i = 0; i <= this.nbStarMax; i++) {
			this.stars[i] = new Star(
				Math.random() * this.width,
				Math.random() * this.height
			);
		}
	}
}

document.querySelector('.gameCanvas').setAttribute.width = this.width;
document.querySelector('.gameCanvas').setAttribute.height = this.height;

function generateStars() {}
