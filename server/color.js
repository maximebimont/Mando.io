export default class Color {
	static colors = ['white'];

	static randomColor() {
		return this.colors[Math.floor(Math.random() * this.colors.length)];
	}
}
