const socket = io();

const welcome = document.getElementById('welcome');
const room = document.getElementById('room');
const roomNickname = welcome.querySelector('form');

room.hidden = true;

let roomName;

// 새로운 메시지를 화면에 표시하는 함수
function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#msg input');
  const value = input.value;
  socket.emit('new_message', input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = '';
}

function showRoom(newCount) {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName} (${newCount})`;
  const msgForm = room.querySelector('#msg');
  msgForm.addEventListener('submit', handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const inputRoom = roomNickname.querySelectorAll('input')[0];
  const inputNickname = roomNickname.querySelectorAll('input')[1];
  socket.emit('enter_room', inputRoom.value, inputNickname.value, showRoom);
  roomName = inputRoom.value;
  inputRoom.value = '';
}

roomNickname.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user, newCount) => {
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} joined!`);
});

socket.on('bye', (user, newCount) => {
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} left ㅠㅠ`);
});

socket.on('new_message', addMessage); // 서버에서 emit할 때 msg인자를 담아서 보내기 때문에 클라이언트에서는 그냥 addMessage로 호출해도 됨

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';
  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.append(li);
  });
});
