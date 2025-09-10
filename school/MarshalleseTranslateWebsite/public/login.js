async function load_func(){
    let authenticated = false; 
    // let auth = false; 
    const userName = localStorage.getItem('userName');
    if (userName) {
        console.log('authenticating user'); 
      const nameEl = document.querySelector('#userName');
      nameEl.value = userName;
      const user = await getUser(nameEl.value);
      authenticated = user?.authenticated;
    // auth = user?.token; 
    }
    if (authenticated) {
        console.log('authenticated'); 
      document.querySelector('#playerName').textContent = `Welcome ${userName}`;
      setDisplay('loginControls', 'none');
      setDisplay('playControls', 'block');
    } else {
        console.log("non authenticated"); 
      setDisplay('loginControls', 'block');
      setDisplay('playControls', 'none');
    }
    callService(sharequote); 
    console.log("callSErvice(sahrequote)");
  }


async function login() {
    loginOrCreate(`/api/auth/login`); 
    // setDisplay('loginControls', 'none');
    // setDisplay('playControls', 'block');
}

async function createUser() {
    loginOrCreate(`/api/auth/create`); 
}

async function loginOrCreate(endpoint){
    const userName = document.querySelector('#userName')?.value; 
    const password = document.querySelector('#userPassword')?.value; 
    const response = await fetch(endpoint, {
        method: 'post', 
        body: JSON.stringify({email: userName, password: password}), 
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        
        },
    });
    const body = await response.json(); 
    // console.log(await response.json() ); 

    if (response?.status === 200){
        localStorage.setItem('userName', userName);
        // console.log(body); 
        window.location.href = 'main.html'; 
    } else {
        const wrong = document.querySelector('#userName'); 
        wrong.value = "Nope, try again :)"; 
        // const wwrong = document.querySelector('#userPassword'); 
        // wwrong.value = "Forgot? Click New User"; 
    }
}

// async function getdata(endpoint {
//     const response = await fetch(endpoint, {
//         method: 'get', 
//         body: JSON.stringif
//     })
// })

function play() {
    window.location.href = 'main.html'; 
}

function logout() {
    fetch(`/api/auth/logout`, {
        method: 'delete', 
    }).then(() => (window.location.href = '/'));
//     setDisplay('loginControls', 'block');
//     setDisplay('playControls', 'none');
}

async function getUser(email){
    const response = await fetch(`/api/userr/${email}`); 
    if (response.status === 200){
        return response.json(); 
    }

    return null; 
}

function setDisplay(controlId, display) {
    const ment = document.querySelector(`#${controlId}`);
    if(ment) {
        ment.style.display = display; 
    }
}

function sharequote(data){
    console.log(data);
    let quo = document.getElementById("quote"); 
    let auth = document.getElementById("quote_author"); 
    quo.innerText = data.content; 
    auth.innerText = data.author; 
}

function callService(sharequote){
    console.log('before fetch');
    fetch ("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
        sharequote(data); 
    })
    console.log('after fetch');
}






  