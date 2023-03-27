import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// 같은 서버에서 http, webSocket 둘 다 작동시키려는 의도
// ws만 사용하고 싶다면 http 서버를 만들지 않아도 됨
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log('Disconnected from Browser');
}

function onSocketMessage(message) {
  console.log(message.toString());
}

wss.on('connection', (socket) => {
  console.log('Connected to Browser');
  socket.on('close', onSocketClose);
  socket.on('message', onSocketMessage);
  socket.send('hello!!');
});

server.listen(3000, handleListen);
