const messageList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

function handleOpen() {
  console.log('Connected to Server');
}

function handleClose() {
  console.log('Disconnected from Server');
}

socket.addEventListener('open', handleOpen); // socket -> 백엔드에서 ws로 통신 해오는 것을 처리
socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
});
socket.addEventListener('close', handleClose);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(makeMessage('new_message', input.value));
  const li = document.createElement('li');
  li.innerText = `You: ${input.value}`;
  messageList.append(li);
  input.value = '';
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
  input.value = '';
}

messageForm.addEventListener('submit', handleSubmit); // 브라우저에서 사용자가 발생시키는 이벤트를 처리
nickForm.addEventListener('submit', handleNickSubmit);
