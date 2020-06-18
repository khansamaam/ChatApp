const socket = io.connect('http://192.168.8.168:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var heading = document.querySelector('.heading');
var audio= new Audio('ting.mp3');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    audio.play();
    messageContainer.scrollTop = messageContainer.scrollHeight;

};

var name = prompt("Enter your Name to join:");
while(name=="")
{
    name = prompt("Enter your Name to join:");

}

heading.innerHTML+=" &emsp; &emsp;&emsp; &emsp;&emsp;Connected";
socket.emit('new-user-joined', name);

    


socket.on('user-joined', name => {
                                                                                            
    append(`${name} joined the chat`, 'right');
});

socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'left');
    console.log(`${data.name}`);
});
socket.on('left', name => {
    append(`${name} left the chat`, 'left');

});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if(!message=="")
{
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
}
})