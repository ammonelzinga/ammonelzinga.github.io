function hello_flip_card(){
    let title = document.getElementById("Hello_title"); 
    let par = document.getElementById("Hello_par");
    if(title.innerText === "Yokwe"){
      title.innerHTML = "Hello";
      par.innerHTML = "Hello, How are you?" 
    }
    else {title.innerHTML = "Yokwe"; 
          par.innerHTML = "Yokwe, Ej et am mour?"}
  }


  function thanks_flip_card(){
    let title = document.getElementById("Thanks_title"); 
    let par = document.getElementById("Thanks_par");
    if(title.innerText === "Komool"){
      title.innerHTML = "Thanks";
      par.innerHTML = "Thanks for the food" 
    }
    else {title.innerHTML = "Komool"; 
          par.innerHTML = "Komooltata kon mona eo"}
  }

  function today_flip_card(){
    let title = document.getElementById("Today_title"); 
    let par = document.getElementById("Today_par");
    if(title.innerText === "Rainin"){
      title.innerHTML = "Today";
      par.innerHTML = "Today is a beautiful day" 
    }
    else {title.innerHTML = "Rainin"; 
          par.innerHTML = "Rainin ej juon raan aiboojoj"}
  }

  function continue_on(){
    let x = document.getElementById("oneofthree"); 
    let y = document.getElementById("twoofthree"); 
    let z = document.getElementById("threeofthree"); 
    x.style.display = 'none'; 
    y.style.display ='none';
    z.style.display ='none';
    let a = document.getElementById("fourofsix"); 
    let b = document.getElementById("fiveofsix"); 
    let c = document.getElementById("sixofsix"); 
    a.style.display = 'block';
    b.style.display = 'block';
    c.style.display = 'block'; 
  }

  function return_back(){
    let x = document.getElementById("oneofthree"); 
    let y = document.getElementById("twoofthree"); 
    let z = document.getElementById("threeofthree"); 
    x.style.display = 'block'; 
    y.style.display ='block';
    z.style.display ='block';
    let a = document.getElementById("fourofsix"); 
    let b = document.getElementById("fiveofsix"); 
    let c = document.getElementById("sixofsix"); 
    a.style.display = 'none';
    b.style.display = 'none';
    c.style.display = 'none'; 
  }


  function monono_flip_card(){
    let title = document.getElementById("Monono_title"); 
    let par = document.getElementById("Monono_par");
    if(title.innerText === "Monono"){
      title.innerHTML = "Happy";
      par.innerHTML = "I am very Happy" 
    }
    else {title.innerHTML = "Monono"; 
          par.innerHTML = "Naij lukkuun monono"}
  }


  function emman_flip_card(){
    let title = document.getElementById("Emman_title"); 
    let par = document.getElementById("Emman_par");
    if(title.innerText === "Emman"){
      title.innerHTML = "Good";
      par.innerHTML = "My life is good" 
    }
    else {title.innerHTML = "Emman"; 
          par.innerHTML = "Emman ao mour"}
  }

  function buromoj_flip_card(){
    let title = document.getElementById("Buromoj_title"); 
    let par = document.getElementById("Buromoj_par");
    if(title.innerText === "Buromoj"){
      title.innerHTML = "Sad";
      par.innerHTML = "I am feeling sad" 
    }
    else {title.innerHTML = "Buromoj"; 
          par.innerHTML = "Naij enjake buromoj"}
  }

  async function check_off(id, keyy){
    let x = document.getElementById(id); 
    x.style.backgroundColor = "lightgreen"; 
    // console.log('first'); 
    if(x.value != 1){
    x.value = 1;
    await save_work(keyy, 1, 1); 
    display_score();
     }
  }
  async function question(id, keyy){
    let x = document.getElementById(id);
    x.style.backgroundColor = 'rgb(244, 244, 244)';
    if(x.value != 0){
    x.value = 0; 
    await save_work(keyy, 0, -1); 
    display_score(); } 
  }
  // Wish this could be its own function couldn't get it to work 

  function save_work(keyy, valuee, new_points){
    let score = localStorage.getItem('score');
    score = parseInt(score);  
    localStorage.setItem(keyy, valuee); 
    score = score + new_points;
    localStorage.setItem('score', JSON.stringify(score));}



async function send_work (){
  let scores = []; 
  const scoresText = localStorage.getItem('scores'); 
  if (scoresText) {
    scores = JSON.parse(scoresText); 
let current_user = get_current_user(); 
for (const [i, score] of scores.entries()) {
    if(JSON.stringify(score.name) === JSON.stringify(current_user)){
      saveScore(score); 
}}}}

  function display_score(){
    let x = localStorage.getItem('score'); 
    x = parseInt(x); 
    let y = document.getElementById('player-score'); 
    y.innerHTML= "Phrases learned: " + x; 
    // return localStorage.getItem('userName');
  
  }
      function getPlayerName(first, second, third, fourth, fifth, sixth){
        document.getElementById("Hello_number").value = first; 
        document.getElementById("Thanks_number").value = second; 
        document.getElementById("Today_number").value = third; 
        document.getElementById("Monono_number").value = fourth; 
        document.getElementById("Emman_number").value = fifth; 
        document.getElementById("Buromoj_number").value = sixth; 
      } 
      function flip_cards(id){
        if (document.getElementById(id).value === "Hello"){
            return Hello.flip_card();
        }
    }

    async function getUserr(){
      let username = get_current_user(); 
      console.log(username); 
      let score = localStorage.getItem('score'); 
      let first = localStorage.getItem('first'); 
      let second = localStorage.getItem('second'); 
      let third = localStorage.getItem('third'); 
      let fourth = localStorage.getItem('fourth'); 
      let fifth = localStorage.getItem('fifth'); 
      let sixth = localStorage.getItem('sixth'); 
      console.log(score); 
      console.log(first); 
      console.log(second); 
      console.log(third); 
      console.log(fourth); 
      console.log(fifth); 
      console.log(sixth); 
  }


  async function getUser(email){
    const response = await fetch(`/api/user/${email}`); 
    if (response.status === 200){
        return response.json(); 
    }
    console.log('didnt worrrrrk'); 
    return null; 
}

async function data(){
  let username = get_current_user(); 
  let x = await getUser(username); 
  console.log(x); 
  console.log(x.email); 
  console.log(x.first); 
  console.log(x.second); 
  console.log(x.third); 
  console.log(x["score"]); 
  console.log(x._id); 
  localStorage.setItem('id', x.id); 
  localStorage.setItem('score', x.score);

  localStorage.setItem('first', x.first);
  if(x.first === "1"){
    console.log("first card learned"); 
  let hey_num = document.getElementById('Hello_number'); 
    hey_num.style.backgroundColor = "lightgreen";}

  localStorage.setItem('second', x.second);
  if(x.second === "1"){
    let thanks_num = document.getElementById('Thanks_number'); 
      thanks_num.style.backgroundColor = "lightgreen";}

  localStorage.setItem('third', x.third);
  if(x.third === "1"){
    let today_num = document.getElementById('Today_number'); 
      today_num.style.backgroundColor = "lightgreen";}

  localStorage.setItem('fourth', x.fourth);
  if(x.fourth === "1"){
    let monono_num = document.getElementById('Monono_number'); 
      monono_num.style.backgroundColor = "lightgreen";}

  localStorage.setItem('fifth', x.fifth);
  if(x.fifth === "1"){
    let emman_num = document.getElementById('Emman_number'); 
      emman_num.style.backgroundColor = "lightgreen";}

  localStorage.setItem('sixth', x.sixth);
  if(x.sixth === "1"){
    let sad_num = document.getElementById('Buromoj_number'); 
      sad_num.style.backgroundColor = "lightgreen";}

  // let x = localStorage.getItem('userName');
let y = document.getElementById('player-name'); 
y.innerText= "Welcome back " + username; 
  // console.log('hiiii'); 
  // console.log(localStorage.getItem('score')); 
  let  show_score = document.getElementById('player-score'); 
  show_score.innerHTML= "Phrases learned: " + x.score; 
  getPlayerName(x.first, x.second, x.third, x.fourth, x.fifth, x.sixth); 
  return x; 
}

async function loadScores() {
  let username = get_current_user(); 
  console.log(username); 
  let scores = []; 
try {
  const response = await fetch('/api/scores'); 
  scores = await response.json(); 
// Save the scores in case we go offline in the future
localStorage.setItem('scores', JSON.stringify(scores));
let user_info = localStorage.getItem('scores');
console.log(user_info); 

} catch {
  // if error use last saved scores
  const scoresText = localStorage.getItem('scores'); 
  if (scoresText) {
    scores = JSON.parse(scoresText); 
  }
}
displayScores(scores); 
} 

function displayScores(scores){
  const tableBodyEl = document.querySelector('#scores'); 
  tableBodyEl.innerHTML = ""; 
  if (scores.length) {
    //update the dom with the scores
    for (const [i, score] of scores.entries()) {
      const nameTdEl = document.createElement('td'); 
      const scoreTdEl = document.createElement('td'); 
      nameTdEl.textContent = score.email; 
      scoreTdEl.textContent = score.score; 
      const rowEl = document.createElement('tr'); 
      rowEl.appendChild(nameTdEl); 
      rowEl.appendChild(scoreTdEl); 
      tableBodyEl.appendChild(rowEl); 
    }
  } else {
    tableBodyEl.innerHTML = '<tr><td colSpan=4>Learn a phrase and come back</td></tr>'; 
  }
}
function get_current_user() {
  return localStorage.getItem('userName') ?? 'Random Friend'; 
}

async function testendpoint() {
  let id = localStorage.getItem('id'); 
  let username = localStorage.getItem('userName'); 
  let scorre = localStorage.getItem('score'); 
  let first = (localStorage.getItem('first'));
  let second = (localStorage.getItem('second'));
  let third = (localStorage.getItem('third'));
  let fourth =(localStorage.getItem('fourth'));
  let fifth = (localStorage.getItem('fifth'));
  let sixth = (localStorage.getItem('sixth'));
  let bod = {email: username, score: scorre, first: first, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth};

  const response = await fetch(`/api/test/${username}`, {
    method: 'PATCH', 
    headers: { 'content-type': 'application/json' },
    // body: '{"test":"yes"}'
    body: JSON.stringify(bod),  
  });
  console.log(response.status); 
  console.log(response); 
  console.log(response.body); 
  send_scores();

}
async function send_scores(){
  let email = get_current_user(); 
  let score = localStorage.getItem('score'); 
  let bod = {email: email, score: score}; 
  const response = await fetch('/api/score', {
    method: 'POST', 
    headers: {'content-type': 'application/json'}, 
    body: JSON.stringify(bod),
  }); 
  console.log(response.status); 
}













