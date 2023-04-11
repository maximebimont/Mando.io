import { io } from 'socket.io-client';
import Color from '../../server/color.js';

////////////////////////////
const GIF = document.querySelector('.GIF');
const mainMenu = document.querySelector('.homeSelect');
const Game = document.querySelector('.GameCanvas');
const playButton = document.querySelector('.play');
const leaderBoard = document.querySelector('.leaderBoard');
const score = document.querySelector('.score-stars');
const loginForm = document.querySelector('.form_game');
const nameInput = loginForm.querySelector('input[type=text]');
const endGameMenu = document.querySelector('.Game-Over');
const playAgain = document.querySelector('.Rejouer');
const skip = document.querySelector('.skipButton');
const closeButton = document.querySelector('.closeButton');
const ScoreButton = document.querySelector('.ScoreButton');
const CreditButton = document.querySelector('.CreditButton');
const credit = document.querySelector('.credit');
const scoresBord = document.querySelector('.scoresBord');

skip.addEventListener('click', event => {
	event.preventDefault();
	GIF.classList.add('hide');
	mainMenu.classList.remove('hide');
	Game.classList.remove('hide');
});

playButton.addEventListener('click', event => {
	event.preventDefault();
	GIF.classList.add('hide');
	mainMenu.classList.add('hide');
	leaderBoard.classList.remove('hide');
	score.classList.remove('hide');
	socket.emit('join', nameInput.value);
});

ScoreButton.addEventListener('click', event => {
	event.preventDefault();
	mainMenu.classList.add('hide');
	scoresBord.classList.remove('hide');
	Game.classList.add('hide');
});

CreditButton.addEventListener('click', event => {
	event.preventDefault();
	mainMenu.classList.add('hide');
	credit.classList.remove('hide');
	Game.classList.add('hide');
});

document.querySelector('.Acceuil_scores').addEventListener('click', event => {
	event.preventDefault();
	mainMenu.classList.remove('hide');
	scoresBord.classList.add('hide');
	Game.classList.remove('hide');
});

document.querySelector('.Acceuil_credit').addEventListener('click', event => {
	event.preventDefault();
	mainMenu.classList.remove('hide');
	credit.classList.add('hide');
	Game.classList.remove('hide');
});

playAgain.addEventListener('click', event => {
	event.preventDefault();
	endGameMenu.classList.add('hide');
	leaderBoard.classList.remove('hide');
	score.classList.remove('hide');
	socket.emit('join', nameInput.value);
});

closeButton.addEventListener('click', event => {
	event.preventDefault();
	endGameMenu.classList.add('hide');
	mainMenu.classList.remove('hide');
});

const socket = new io();

const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');

let canvasWidth,
	canvasHeight,
	mouseX = 0,
	mouseY = 0,
	mapWidth,
	mapHeight;

const canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
canvasResizeObserver.observe(canvas);

function resampleCanvas() {
	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
}

resampleCanvas();

let inGame = false;

let player,
	actualZoom = 0,
	players = [],
	stars = [],
	color = Color.getColor();

function drawGrid() {
	context.beginPath();
	context.strokeStyle = 'grey';
	context.lineWidth = 0.05;
	for (let x = -mapWidth; x <= mapWidth; x += 5) {
		context.moveTo(x, -mapHeight);
		context.lineTo(x, mapHeight);
	}
	for (let y = -mapHeight; y <= mapHeight; y += 5) {
		context.moveTo(-mapWidth, y);
		context.lineTo(mapWidth, y);
	}
	context.stroke();
	context.closePath();
}

function drawStars(star) {
	context.beginPath();
	context.fillStyle = star.color;
	context.arc(star.pos.x, star.pos.y, star.radius, 0, 2 * Math.PI, false);
	context.fill();
	context.closePath();
}

function drawPlayer(player) {
	context.beginPath();
	context.strokeStyle = 'black';
	context.fillStyle = color;
	context.arc(player.pos.x, player.pos.y, player.radius, 0, 2 * Math.PI, false);
	context.fill();
	context.stroke();

	context.textAlign = 'center';
	context.fillStyle = 'white';
	context.font = `bold ${player.radius * 0.5}px arial`;
	context.fillText(
		player.name,
		player.pos.x,
		player.pos.y + player.radius * 0.15
	);
	context.strokeStyle = 'white';
	context.strokeText(
		player.name,
		player.pos.x,
		player.pos.y + player.radius * 0.15
	);
	context.closePath();
}

function render() {
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	context.save();
	context.translate(canvasWidth / 2, canvasHeight / 2);
	if (player != undefined) {
		context.scale(actualZoom, actualZoom);
		context.translate(-player.pos.x, -player.pos.y);
	} else {
		context.scale(20, 20);
	}
	drawGrid();
	stars.forEach(s => drawStars(s));
	players.forEach(p => drawPlayer(p));
	context.restore();
	requestAnimationFrame(render);
}

socket.on('allowConnection', mapSize => {
	mapWidth = mapSize.width / 2;
	mapHeight = mapSize.height / 2;
});

socket.on('joined', () => {
	inGame = true;
});

socket.on('dead', () => {
	console.log(endGameMenu);
	//deathTimer(player);
	endGameMenu.classList.remove('hide');
	leaderBoard.classList.add('hide');
	score.classList.add('hide');
	inGame = false;
});

socket.on('updateGame', game => {
	players = game.players.sort((a, b) => {
		return a.score - b.score;
	});
	stars = game.stars;
	player = players.find(p => p.socketId == socket.id);
	if (player != undefined) {
		refreshScore(player.score);
		refreshLeaderBoard();
	}
});

render();

canvas.addEventListener('mousemove', event => {
	if (inGame) {
		mouseX = event.clientX - canvasWidth / 2;
		mouseY = event.clientY - canvasHeight / 2;
	}
});

setInterval(() => {
	if (inGame) {
		socket.emit('setDirection', {
			socketId: socket.id,
			x: mouseX,
			y: mouseY,
		});
	}
}, 1000 / 30);

setInterval(() => {
	if (inGame) {
		actualZoom = player.zoom;
	}
}, 1000 / 60);

function refreshLeaderBoard() {
	const orderedPlayers = players.slice(0, players.length).reverse();
	let leaderBoard = '';
	const playerIndex = orderedPlayers.findIndex(
		p => p.socketId == player.socketId
	);
	orderedPlayers.slice(0, 10).forEach((p, idx) => {
		leaderBoard += `<tr><td class="${idx == playerIndex ? 'me' : ''}">${
			idx + 1
		}.${p.name}</td></tr>`;
	});
	if (playerIndex >= 10)
		leaderBoard += `<tr><td>${playerIndex}.${player.name}</td></tr>`;
	document.querySelector('.bodyBoard').innerHTML = leaderBoard;
}

function refreshScore(score) {
	document.querySelector('.score').innerHTML = score;
}

// function deathTimer(player) {
// 	document.querySelector('.Time').innerHTML = player.getPlayTimer();
// }
