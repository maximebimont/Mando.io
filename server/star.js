import Cell from './cell.js';
import Color from './color.js';

export default class Start extends Cell {
	constructor(x, y) {
		super(x, y, Color.getColor(), 1);
	}
}
