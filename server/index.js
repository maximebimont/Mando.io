import http from 'http';
import express from 'express';
import addWebpackMiddleware from './addWebpackMiddleware.js';
import { Server as IOServer } from 'socket.io';
import Game from './game.js';

const app = express();
addWebpackMiddleware(app);
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);
const game = new Game(100, 100);

io.on('connection', socket => {
	console.log(`Nouvelle connexion du client ${socket.id}`);
	socket.emit('allowConnection', {
		width: Game.width,
		height: Game.height,
	});

	socket.on('disconnect', reason => {
		console.log(`Déconnection du client ${socket.id}`);
		game.disconnect(socket.id);
	});

	socket.on('join', name => {
		if (game.join(socket.id, name)) socket.emit('joined');
	});

	socket.on('getLeaderboard', () => {});

	socket.on('setDirection', data => {
		game.setDirection(data.socketId, data.x, data.y);
	});
});

app.use(express.static('client/public'));

const port = process.env.PORT || 8000;
httpServer.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});

setInterval(() => {
	for (let i = game.deadQueue.length - 1; i >= 0; i--) {
		io.sockets.sockets.get(game.deadQueue[i]).emit('dead');
		game.deadQueue.splice(i, 1);
	}

	game.update();

	io.emit('updateGame', {
		players: game.players,
		stars: game.stars,
	});
}, 1000 / 60);
