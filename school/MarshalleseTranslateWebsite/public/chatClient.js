// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  appendMsg('system', 'websocket', 'connected');

};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
  const text = await event.data.text();
  const chat = JSON.parse(text);
  appendMsg('friend', chat.name, chat.msg);
  // appendfriend(chat.contact_class, chat.contact); 
};

// If the webSocket is closed then disable the interface
socket.onclose = (event) => {
  appendMsg('system', 'websocket', 'disconnected');
  document.querySelector('#name-controls').disabled = true;
  document.querySelector('#chat-controls').disabled = true;
};

// Send a message over the webSocket
function sendMessage() {
  const msgEl = document.querySelector('#new-msg');
  const msg = msgEl.value;
  if (!!msg) {
    const usernaame = localStorage.getItem('userName');
    appendMsg('me', usernaame, msg);
    // const name = document.querySelector('#my-name').value;
    
    socket.send(`{"name":"${usernaame}", "msg":"${msg}"}`);
    msgEl.value = '';
    // appendfriend('me', usernaame); 
  }
}

// Show world we're connected
// function show_connected(user){
  // let username_class = user+"class"; 
    // appendfriend('me', user); 
    // socket.send(`{"contact_class":"${username_class}", "contact":"${username}"}`); 
// }

// Create one long list of messages
function appendMsg(cls, from, msg) {
  const chatText = document.querySelector('#chat-text');
  chatText.innerHTML = chatText.innerHTML + 
    `<div><span class="${cls}">${from}</span>: ${msg}</div>`
    ;
}
// create list of friends
function appendfriend(cls, from){
  let friend_list = document.querySelector('#friends_list');
  friend_list.innerHTML = friend_list.innerHTML + 
  // '<tr><td><button class="${cls}">${from}</button></td> </tr>'
  `<tr><td><button class="${cls}">${from}</button></td></tr>`;
}

// Send message on enter keystroke
const input = document.querySelector('#new-msg');
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// async function login() {
//   const user_name = document.getElementById('userName');
//   localStorage.setItem("userName", user_name.value);
//   localStorage.setItem("score", 0); 
//   let user = localStorage.getItem("userName"); 
//   // document.getElementById('Thanks_number').value = "0"; 
//   window.location.href = "index.html"; 
  
  // x = document.getElementById('player-name'); 
  // x.innerHTML = user_name.value; 
// }
 
// Disable chat if no name provided
// const chatControls = document.querySelector('#chat-controls');
// const myName = document.querySelector('#my-name');
// const usernaame = localStorage.getItem('userName')
// myName.addEventListener('keyup', (e) => {
//   chatControls.disabled = myName === ''; 
// });