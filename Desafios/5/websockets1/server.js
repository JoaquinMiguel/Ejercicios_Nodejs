const express = require('express');
const path = require('path');
const { Server: HttpServer} = require('http');
const { Server: IOServer } = require('socket.io');


const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer, {
//	cors: {
//		origin: 'http://localhost:3000',
//	},
})

const messages = [];

io.on('connection', (socket) => {
	console.log('Usuario conectado');

	socket.emit('connectionMessage', 'Bienvenidos a el socket Coderhouse')
	socket.emit('messageBackend', messages)

	socket.on('disconnect', () => {
		console.log('Usuario desconectado')
	})

	socket.on('messageFront', (data) => {
		console.log(data)
		messages.push({
			socketId: socket.id,
			mensaje: data,
		})
		io.sockets.emit('messageBackend', messages) //no es simultaneo, hay q reiniciar la pag
	})
  
})



app.use(express.json());
app.use(express.urlencoded({extended: true}));
//
app.use('/static', express.static(__dirname + '/public'));

//http!! ojo con poner app. sino no levanta webSocket
httpServer.listen(PORT, () => console.log(`Server activo en http://localhost:${PORT}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'))
})
