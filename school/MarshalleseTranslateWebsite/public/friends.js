async function receive_friends_list(){
    let username = get_current_user(); 
    let x = await getUser(username); 
    console.log(x); 
    const tableBodyEl = document.querySelector('#friends_status'); 
        tableBodyEl.innerHTML = ""; 
    for (const [index, [key, value]] of Object.entries(Object.entries(x))) {
        if(index > 10){
        console.log(`${index}: ${key} = ${value}`); 
        
        // if (scores.length) {
          //update the dom with the scores
        //   for (const [index, [key, value]] of Object.entries(Object.entries(x))) {
           
            // if(index > 4){
            // console.log(`${index}: ${key} = ${value}`); 
        //   for (const [i, score] of scores.entries()) {
            if(value === 1){
            const nameTdEl = document.createElement('td'); 
                const scoreTdEl = document.createElement('td'); 
                scoreTdEl.textContent = "requested"; 
                nameTdEl.textContent = key; 
                const rowEl = document.createElement('tr'); 
            rowEl.appendChild(nameTdEl); 
            rowEl.appendChild(scoreTdEl); 
            tableBodyEl.appendChild(rowEl); 
            }
            else if(value === 2){
                const nameTdEl = document.createElement('td'); 
            
                const scoreTdEl = document.createElement('td'); 
                
                scoreTdEl.innerHTML = '<button class = "btn btn-primary bg-success">Accept</button>'; 
                scoreTdEl.id = key; 
                console.log(scoreTdEl.id); 
                scoreTdEl.setAttribute( "onClick", "accept_friend(this.id)"); 
                nameTdEl.textContent = key; 
                const rowEl = document.createElement('tr'); 
            rowEl.appendChild(nameTdEl); 
            rowEl.appendChild(scoreTdEl); 
            tableBodyEl.appendChild(rowEl); 
            // scoreTdEl.textContent = statuss; 
            
          }
        // } else {
        //   tableBodyEl.innerHTML = '<tr><td colSpan=4>Learn a phrase and come back</td></tr>'; 
        }
      }
    //   const tableBodyEll = document.getElementById('friends_status'); 
    //   if(tableBodyEll.style.display === 'none'){
    //   tableBodyEll.style.display = 'block'; 
        // }
    //   else {
        // tableBodyEll.style.display = 'none';
    //   }
    }
async function show_accepted_friends(){
    let username = get_current_user(); 
    let x = await getUser(username); 
    console.log(x); 
    const tableBodyEl = document.querySelector('#accepted_friends'); 
        tableBodyEl.innerHTML = ""; 
    for (const [index, [key, value]] of Object.entries(Object.entries(x))) {
        if(index > 10){
        console.log(`${index}: ${key} = ${value}`); 
        
        // if (scores.length) {
          //update the dom with the scores
        //   for (const [index, [key, value]] of Object.entries(Object.entries(x))) {
           
            // if(index > 4){
            // console.log(`${index}: ${key} = ${value}`); 
        //   for (const [i, score] of scores.entries()) {
            if(value === 3){
            const nameTdEl = document.createElement('td'); 
            
                const scoreTdEl = document.createElement('td'); 
                let y = await getUser(key); 
                scoreTdEl.textContent = y.score; 
                nameTdEl.textContent = key; 
                const rowEl = document.createElement('tr'); 
            rowEl.appendChild(nameTdEl); 
            rowEl.appendChild(scoreTdEl); 
            tableBodyEl.appendChild(rowEl); 
}}}receive_friends_list()}

    function get_current_user() {
        return localStorage.getItem('userName') ?? 'Random Friend'; 
      }

      async function getUser(email){
        const response = await fetch(`/api/user/${email}`); 
        if (response.status === 200){
            return response.json(); 
        }
        console.log('didnt worrrrrk'); 
        return null; 
    }

    async function add_friend() { 
        let text = document.getElementById('search_friends'); 
        let potential_friend = text.value; 
        console.log(potential_friend); 

        const user = await getUserr(potential_friend);
        console.log('endpoint worked'); 

        if(user){
            console.log('reached beginning'); 
            let friend = document.getElementById('found_friend'); 
            friend.innerText = user.email;
            friend.style.display = 'block'; 
            console.log('reached middle'); 
            // let button = document.getElementById('request_button'); 
            // button.style.display = 'block'; 
            console.log('reached end'); 

    }
    else{ console.log('not even a user try again');
            let not_friend = document.getElementById('found_friend'); 
            not_friend.innerText = "hmmm, not a user try again";
            not_friend.style.display = "block"; 
        }
      }


    async function request_friend(){
        let text = document.getElementById('search_friends'); 
        let potential_friend = text.value; 
        console.log(potential_friend); 
        let username = localStorage.getItem('userName'); 
    
        let bod = {email: username, key: potential_friend, value: 1, valuee: 2};
      
        const response = await fetch(`/api/friend/${username}`, {
          method: 'PATCH', 
          headers: { 'content-type': 'application/json' },
          // body: '{"test":"yes"}'
          body: JSON.stringify(bod),  
        });
        console.log(response.status); 
        console.log(response); 
        console.log(response.body); 
        show_accepted_friends()
    }

async function accept_friend(friend){
    // let text = document.getElementById('search_friends'); 
        let potential_friend = friend; 
        console.log(potential_friend); 
        let username = localStorage.getItem('userName'); 
    
        let bod = {email: username, key: potential_friend, value: 3, valuee: 3};
      
        const response = await fetch(`/api/friend/${username}`, {
          method: 'PATCH', 
          headers: { 'content-type': 'application/json' },
          // body: '{"test":"yes"}'
          body: JSON.stringify(bod),  
        });
        console.log(response.status); 
        console.log(response); 
        console.log(response.body); 
        show_accepted_friends()
}

      async function getUserr(email){
        const response = await fetch(`/api/userr/${email}`); 
        if (response.status === 200){
            return response.json(); 
        }
    
        return null; 
    }