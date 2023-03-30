const GIF = document.querySelector('.GIF');

const homeSelector = document.querySelector('.homeSelect');
homeSelector.style.display = 'none';

const Game = document.querySelector('.GameCanvas');
Game.style.display = 'none';

const end = document.querySelector('.Game-Over');
end.style.display = 'none';

const scores = document.querySelector('.scores');
scores.style.display = 'none';

const credit = document.querySelector('.credit');
credit.style.display = 'none';

document.querySelector('.skipButton').addEventListener('click', event => {
	event.preventDefault();
	homeSelector.style.display = '';
	GIF.style.display = 'none';
});

document.querySelector('.Jouer').addEventListener('click', event => {
	event.preventDefault();
	homeSelector.style.display = 'none';
	Game.style.display = '';
});

document.querySelector('.Score').addEventListener('click', event => {
	event.preventDefault();
	homeSelector.style.display = 'none';
	scores.style.display = '';
});

document.querySelector('.Credit').addEventListener('click', event => {
	event.preventDefault();
	homeSelector.style.display = 'none';
	credit.style.display = '';
});

document.querySelector('.Acceuil_scores').addEventListener('click', event => {
	event.preventDefault();
	homeSelector.style.display = '';
	scores.style.display = 'none';
});
document.querySelector('.Acceuil_credit').addEventListener('click', event => {
	event.preventDefault();
	homeSelector.style.display = '';
	credit.style.display = 'none';
});
