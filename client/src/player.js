export default class Player {
	nom;
	image;
	x;
	y;
	vitesse;
	score;
	timer;

	constructor(nom, image, x, y, vitesse) {
		this.nom = nom;
		this.image = image;
		this.x = x;
		this.y = y;
		this.vitesse = vitesse;
		this.score = 0;
		this.timer = 0;
	}
}
