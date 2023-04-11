export default class Color {
	static colors = ['red', 'blue', 'green', 'purple'];

	static getColor() {
		return this.colors[Math.floor(Math.random() * this.colors.length)];
	}

	static getWhite() {
		return 'White';
	}
}
