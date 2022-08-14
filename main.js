const socket = io('https://sabchat.herokuapp.com');

const form = document.querySelector('form');
const messageInput = document.querySelector('input');
const messageContainer = document.querySelector('.message-container');

const append = (message) =>{
  const messageElement = document.createElement('p');
  messageElement.innerText = message;
  messageContainer.append(messageElement)
}
const name = prompt('Enter your name:')
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`);
  socket.emit('send', message);
  messageInput.value = '';
})
socket.emit('new-user-joined',name);
socket.on('user-joined',data =>{
    append(`${data} joined the chat`)
});
socket.on('recieve', data =>{
    append(`${data.name}: ${data.message}`);

})