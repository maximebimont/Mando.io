export default class Vector {
	x;
	y;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(other) {
		this.x += other.x;
		this.y += other.y;
	}

	substract(other) {
		this.x -= other.x;
		this.y -= other.y;
	}

	multiply(n) {
		this.x *= n;
		this.y *= n;
	}

	length() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	normalize() {
		const newVec = new Vector(this.x, this.y);
		const len = this.length();
		if (len != 0) {
			newVec.x /= len;
			newVec.y /= len;
		}
		return newVec;
	}

	distance(other) {
		return Math.sqrt(
			Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
		);
	}
}
