const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
  console.log('Connected to Server');
}

function handleMessage(message) {
  console.log('New message: ', message.data);
}

function handleClose() {
  console.log('Disconnected from Server');
}

socket.addEventListener('open', handleOpen);
socket.addEventListener('message', handleMessage);
socket.addEventListener('close', handleClose);

setTimeout(() => {
  socket.send('hello from the browser!');
}, 1000);
