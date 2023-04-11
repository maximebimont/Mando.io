export default class Color {
	static colors = ['white', 'red', 'blue', 'green', 'purple'];

	static getColor() {
		return this.colors[Math.floor(Math.random() * this.colors.length)];
	}

	static getWhite() {
		return this.colors[0];
	}
}
