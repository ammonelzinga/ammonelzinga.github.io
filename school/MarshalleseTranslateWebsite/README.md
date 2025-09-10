# first_repo Notes for class
my first repo 


http status codes: 

200 okay
201- successful, 
204 server fulfilled request no need to return info
401 authentication required 
404 not found
500 internal server error
301 permanent redirect


cookies allow: 
a server can store data on the client/browser

Port 80 is reserved for HTTP

HTTP status codes in the 300 range are for content redirects or caching

Language is not a standard HTTP header. 

(content-type, host, cookie are standard HTTP headers)

For the request [get]/fav/george what is logged? paul george john

app.use(function (req, res, next) {
  console.log('Paul'); 
   next(); 
   }); 
app.put('/fav/:person', (req, res, next) => {
console.log('ringo'); 
next(); 
}); 

app.get('/fav/:person', (req, res, next) => {
console.log(req.params.person); 
next(); 
}); 

app.get('/*', (req, res, next) => {
console.log('john'); 
next(); 
}); 

app.use((_req, res) => res.send(); 

which express middleware will match this fetch request? app.delete(/fav\/(.*)/, () => {})

const r = await fetch('/fav/ringo', {
  method: 'delete'
 }); 
 
What document matches this mongoDB query? { $or: [{name:/J.*/}, {score: {$lt:3}}]}
{name: "walke", score: -55}

Why is hashing stored passwords important? 
- it improves security by making the password unreadable


given the following code what will console.log print? ClientServer:Hello
<!--  --> executed on server: 
const {WebSocketServer } = require('ws'); 
const wss = new WebSocketServer({ port: 9900 }); 

wss.on('connection', (ws) => {
ws.on('message', (data) => {
  const msg = String.fromCharcode(...data); 
  ws.send('Server:${msg}');
  }); 
}); 

<!--  -->Executed on browser: 
const socket = new WebSocket('ws://localhost:9900'); 
socket.onmessage = (event) => {
console.log('Client:${event.data}'); 
}; 
socket.send("hello); 

What value does WebSocket add to HTTP?
It is peer to peer instead of client to server

What is not a purpose of jsx? 
to combine CSS, HTML, and Javascript

What will component A initially display? tacofish

const B = () => <b>burger</b>; 
const C = () => <b>fish</b>;
const D = () => <b>taco</b>;
const A = () => {
  const [v, updateV] = React.useState(false); 
  const [x, updateX] = React.useState(B); 
  
  let o = <C />; 
  if(v) {
    o = <B />; 
   }
   
  React.useEffect(() => updateX(D), [v]); 
  
  return (
    <p onClick={() => updateV(true)}>{x}{o}</p>
   ); 
  }; 
  
what component will the URL `/burger` render? B 

<BrowserRouter>
  <div className = 'app'>
    <nav>
      <NavLink to=`/`>A</NavLink>
      <NavLink to='/burger' element = {<B />} /> 
    </nav> 
    
    <main> 
      <Routes>
        <Route path ='/' element = {<A />} exact />
        <Route path='/burger' element={<B />} />
        <Route path='*' element={<C />} />
      </Routes>
    </main>
  </div>
  </BrowserRouter>
  
  What does the command "NPM install ws" not do? 
  Adds template code for websockets to your JavaScript
  
  (other wrong choices: locks the version of the websocket package for your application, adds the webscoket source code to the node_modules directory, adds a dependency to your package.json file)
  
  
  You can use fetch in front-end and back-end code, true; 
  
  
  Which of the following is not true about a linux daemon? 
  Cannot fork other processes 
  
  (other wrong choices: executes independent of a user, starts when the computer is rebooted, pm2 is an example of a daemon) 
  



reactivity notes: 

jsx/react functions: 

first import react: 

import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

The render function. Use this at the end. 
ReactDOM.render(<Survey />, document.getElementById("root"));

It's taking teh Survey component which we coded. The survery componenet can have nested components inside of it: 

const Survey = () => {
  const [text, updateText] = React.useState();

  // When the color changes update the state
  const myfunc = (e) => {
    updateText(e.target.value);
  };
  return (
    <div>
    <add whatever component then further down the line make the code for that componenet> 
    
    also onChange is a good built in funciton. 

mongodb notes: 

Look up on the mongo website for how to use their code. Check the collections to make sure it is uploading correctly. You'll need to make a mongo client with your url: 

const url = `mongodb+srv://zingaboy:elzinga11@cluster0.syujyru.mongodb.net`;

const client = new MongoClient(url);
const userCollection = client.db('startup').collection('user');
const scoreCollection = client.db('startup').collection('score');

But from there you can use userColleciton.(whateverfunction). 

For the express and node: 

You can only have ONE "function" have the same endpoint. Tried having two different functions go to the same endpoint address and it doesn't work (at least the way I treid it). 

Also it's important to send data in a {'key': 'value'} object/dictionary format. This took me hours upon hours upon hours to figure out, so don't make that same mistake again! You can use console.log and inspect the page on the html to see the status of your requests/responses from the endpoints. 

You also can't console.log from database.js. That doesn't work. 

Websocket: 
Have a server.js and a client.js 

make sure to:
const { WebSocketServer } = require('ws');

use onmessage, onclose, onopen websocket methods 

remember to json.parse the data

for authentication

use the compare function to compare the password with the encrypted one that is saved to mongo database. You can use a response with a boolean of authentication = collection.token to change the state of the log in page depending on if the user is already logged in, or logged out. 

use cookie-parser and b-crypt packages. 

simon react notes: 

1) The entire application with react can be on the same webpage. Instead of an html page for each functional peice, we have a React componenet. App.jsx is the parent of all components. It's interesing that even with this, on the website it'll have /play or /about at the end of the url. You can type in html in jsx. and class has to become className

2) React function useEffect runs when the name changes. calls out to simon getUser a sets a state variable based on the result. Then either shows or hides the content. a state variable is a very common react feature to toggle between two different modes. 

to use a state variable: const [variable, toggle_variable] = React.useState(localStorage.getItem('userName') || ''); 

I believe it is assigning userName to variable. toggle_variable is basically used to change the variable. ex: toggle_variable(variable = variable + 1); 

3) Remember to have your function names be called 'export function ....()' 

4) install these npm packages: 
        npm install react-router-dom
        npm install bootstrap react-bootstrap 
        
        and import accordingly: 
        import 'bootstrap/dist/css/bootstrap.min.css';

5) Here's what you need to do to be able to switch "pages" to show the play.jsx, scores.jsc, etc: 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

And also use this: 

  {authState === AuthState.Authenticated && (
      <li className='nav-item'>
        <NavLink className='nav-link' to='play'>
          Play
        </NavLink>
      </li>
    )}
    
 And then also: 
 
 <Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/play' element={<Play />} />
  <Route path='/scores' element={<Scores />} />
  <Route path='/about' element={<About />} />
  <Route path='*' element={<NotFound />} />
</Routes>

 That was found in app.jsx the overarching .jsx parent file. This helps the program to know where to take the user after clicking on each tab.
 
Note that the authState === AuthState.Authenticated is making sure that the state is in authenticated before displaying the information ( I believe so) . 


Please note that <App /> is required. 

6) It appears that the database.js code seems consistent as before. 

7) Each file in src (this used to be our public folder) will have another folder for each viewpage. Play, scores, login, etc. 

Within each of those,  you can have .css, .js, and .jsx files. I'm not sure yet if it's required but it appears (at least for the login folder) that there is a separate .jsx for each state of the webpage (depending if the user was logged in or not). 

Each of these different files can look very confusing at the start, but it almost appears as if the .js file is sort of like a header file, and the .jsx file is the one that implements the code for the class found in the .js file. 

We see an example of this with authState.js: 

export class AuthState {
  static Unknown = new AuthState('unknown');
  static Authenticated = new AuthState('authenticated');
  static Unauthenticated = new AuthState('unauthenticated');

  constructor(name) {
    this.name = name;
  }
}

8) In bootstrap with jsx, we use something called Modal. This is simply a message/image that is displayed on the screen. 

9) In the app.jsx file, the function app() will check to see if the user is authenticated. What's cool is that the return value is what the webpage looks like. It has the html starting with the header and going down to the footer. It makes it tricky to see how everything is connected, so research more about react componenets.

10) We have a file called gameNotifier.js. What's interesting is this piece of code: 

 constructor() {
    // When dev debugging we need to talk to the service and not the React debugger
    let port = window.location.port;
    if (process.env.NODE_ENV !== 'production') {
      port = 3000;
    }
    
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'connected' }));
    };
    
 I like this file because it helps with sending messagse with the socket. It helps keep it organized. 
 
 broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.socket.send(JSON.stringify(event));
  }
  
  they use the socket.sent code as before. 
  

simon websocket note: 

Always remember to npm install, you may need to npm install ws. also npm init -y

The websocket still uses HTTP but it is an 'upgrade'. You need to use a wss.handleUpgrade to get a socket to upgrade to websocket so that you can have communication back and forth between the server and the client. In this way they become peers. 

So we need to add code for the server end of things and the client end of things. 

We need to import ws first: const { WebSocketServer } = require('ws'); 

When making an instance of of WebSocketServer you have the option to set 'noServer' to true. This will require you to manually include upgrade code but allows you to use your own server? I believe: 

ex: 
const wss = new WebSocketServer({ noServer: true });

We also need to manually upgrade the connection to be Websocket: 

// Handle the protocol upgrade from HTTP to WebSocket
    httpServer.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
      });
    });
    
you can use ws.on as an event listener. you can use ws.onmessage or .onclose or .onopen, etc. You can also do ws.on('message'...) I'm actually not sure what the difference so I will ask the TA once I turn this assignment in. 

For example you can say wss.on('connection', ....) or you can have ws.on('message'...)  

But here are the examples given: 

let connections = [];

Okay so for this part, it seems we are using uuid.v4(). I believe that is just the version of uuid. I tested it and it looks like uuid.v1() also works okay. The alive: true is important (setting it to false made the connection not work). But we are simply appending all the uuid's onto a connections list with this first function. 

    wss.on('connection', (ws) => {
      const connection = { id: uuid.v4(), alive: true, ws: ws };
      connections.push(connection);

Now for the fun part. I believe this is executed when a message is sent over because it is .on('message'). I beleive we do c.id !== connection.id because we don't need to send it back to the sender (but I believe for my startup I will want to do this differently because I want both people to see the same messages) 
      // Forward messages to everyone except the sender
      ws.on('message', function message(data) {
        connections.forEach((c) => {
          if (c.id !== connection.id) {
            c.ws.send(data);
          }
        });
      });

I think I can basically just use this same code for my startup. This is basically adjusting the connections list (message recipient list we could say) so that the server doesn't try to send out a message to someone who isn't connected. 

      // Remove the closed connection so we don't try to forward anymore
      ws.on('close', () => {
        connections.findIndex((o, i) => {
          if (o.id === connection.id) {
            connections.splice(i, 1);
            return true;
          }
        });
      });

AS well as the ping and pong. These are used to help check for connections and I think I can bascially use this same code for the startup: 

// Respond to pong messages by marking the connection alive
      ws.on('pong', () => {
        connection.alive = true;
      });
    });

    // Keep active connections alive
    setInterval(() => {
      connections.forEach((c) => {
        // Kill any connection that didn't respond to the ping last time
        if (!c.alive) {
          c.ws.terminate();
        } else {
          c.alive = false;
          c.ws.ping();
        }
      });
    }, 10000);
  }
}

It's important to remember to module.export the class.

This is how we would import the class we just made previously called PeerProxy: 

const { PeerProxy } = require('./peerProxy.js');

And in the index.js file we can create an instance of the class and passing in an HttpService. You will get to see the "listening on port 3000' on the console once you run it with the visual studio debugger. 

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

new PeerProxy(httpService);

I"m just going to break down the websocket code for play.js to help me understand it: 

First things, we are giving a check to make sure that there is an http or ws connection? I think that's what the first line is doing. 

Creating a new websocket is a built in class of the websocket package. 

Here we are using the event listeners .onclose, .onopen, and .onmessage. 

It's calling this.displayMSG, for my startup I will have a function that displays the chat communication that will be different. 

One thing to note is how JSON is used to parse and stringify the data. This will be very imporant for when I need to dispaly the messages for my start up. 
configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
      this.displayMsg('system', 'game', 'connected');
    };
    this.socket.onclose = (event) => {
      this.displayMsg('system', 'game', 'disconnected');
    };
    this.socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === GameEndEvent) {
        this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
      } else if (msg.type === GameStartEvent) {
        this.displayMsg('player', msg.from, `started a new game`);
      }
    };
  }
  
 Here is another important funciton. This one is also a local function made, but I will need to make a similar one. This is how a socket can send an event, and then the configureWebSocket function will receive it. But it might go through the server first? I need to ask the TA to clarify this. Depending on the data received (the game type, which was specified when this broadcastEvent function is called) the configurewebsocket will do different things. 
 

  broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    this.socket.send(JSON.stringify(event));
  }
}

So its this socket.send function that is the bridge/sender to the configurewebsocket function and the rest of the local data. 

simon-login notes: 

This is probably the coolest part. I've been able to learn so much from the lecture with cookies and tokens! 

I will need to edit my html functions and css to include an interface for usernames and password. 

Will need to create another variable from the instance client from the MongoClient class for the user. 

A couple simple functions to get the email and token: 

function getUser(email) {
return userCollection.findOne({email: email)}; 
}
the findone function can take the 'email' typed out and find it from the database. 

We will need to have a createUser function that includes awaits, a bcrypt.hash (remember to download the bcrypt package). 

Just remember that insertOne can also automatically add new information. this is why we use it in the craetUser function. 

for index.js notes: 
This is where the cookie fun comes into play. 

The apirouter.post will be used to check for when someone is creating a new account. It needs to first check if there is an existing user. it uses res.status(409), which simply represents "conflict." Then simply call our database function by saying DB.createuser(req.body.email, req.body.password); 

We also need to now call setAuthoCookie(res, user.token); 
And then res.send({
id: user._id, 
}); 

Now for checking if a login attempt matches their username and password. We get to use the super fancy bcrypt package to do this since the passwords are encrypted. 

This is super important and I want to copy and paste it here, basically if the password matches up, then we can call the setAuthCookies function. 

This keeps the cookie safe and secure. 

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

Here's another function that I think I will need for my startup. I'm still trying to learn it so I want to paste it here as well. I do know that this makes the program more safe. 

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

All of this code comes into play when we use them in login.js 

An important one: 

if (response?.status === 200) {
    localStorage.setItem('userName', userName);
    window.location.href = 'play.html';
  } else {
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}

This will check to make sure that the cookies are all good and set and authorized (response?.status ===200). I love how we can't even look at the cookie, but we don't need to because the browser knows its good and send the 200. 

We create a logOrCreate function that will basically take the input from the username and password boxes. If they are good, then it'll go to play.html and the user will be logged in!

Remeber that we can take a look at atlas to see the usernames that have been added. This will help me as I create the startup so I can see how the data is stored. The third party resources and code packages really smooth the encrypting, data storing, and data transferring to be quite smooth. 

Simon DB notes:

Atlas login email is ammonelzinga@gmail.com
you can go to connect to get the hostname (it ends in .net). 

To update your user, password, and hostname credentials on the production environment you can use this code in the terminal or git bash: 

ssh -i ~/keys/production.pem ubuntu@myfunkychickens.click

sudo vi /etc/environment

export MONGOUSER=<yourmongodbusername>
export MONGOPASSWORD=<yourmongodbpassword>
export MONGOHOSTNAME=<yourmongodbhostname>
      
Remember the :w or :wq and the ZZ helps you get out of editing it. press i to insert. 
     
Okay to connect to the database we need to first make some functions in a file we can call database.js. We will call these functions in the index.js file which used express to globally store the scores. 
      
 The first thing you want to do is a safety feature so that only you who has the right credentials can make changes. It goes as follows: 
      
const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

Next we can copy down the connection url from our atlas website. Remember to have the local IP address accessible. 
      
const url = `......'; 
      
We can now make an instance of the class MongoClient form that url variable. 
      
const client = new MongoClient(url); 

In addition we need to help the mongo db know where in our database we want to store the following information. We want it to be a in a database called 'simon.' so to do that we can use client.db('simon'). Further more we want to make a collection. A collection is similar to a list of tables to store information. So we can input our scores data in a collection. 
      
we do: 
      
const scoreCollection = client.db('simon').collection('score'); 

Now we can make some functions. Some functions to remember are insertone and toArray and find.  
      
insertone will allow us to update a document/table into our collections of 'score'. 
toArray helps the rest of our code process the data from the collection to display it because it's in array format. 
      
Also good to remember is the syntax for >. We do $gt: for >. (a quick google search will bring examples of further syntax). 
      
There are properties as well in mongo. We use 1) sort and 2) limit in this simon example. These help us when we use the find function because we can pass these properties in to help us filter what data we want to be in our array. 
      
At the end we need to use module.exports(pass in our functions) so that node.js knows which functions to be able to pull out from this file.  
 
      
      
      
Service notes: 

      The service code allows us to use express package and node.js which help us be able to store data into a server. This allows the scores to be seen by everybody and not just locally. I'm really excited to implement this in my start up project. 
      
      I really liked the steps given in the assignment so I wanted to list them here: 
     1)  Move all the previous deliverable code files (_.html, _.js, *.css, favicon.ico, and asserts) into a sub-directory named public. We will use the HTTP Node.js based service to host the front-end application files. This is done with the static file middleware that we will add our service index.js. 
      
      2) Within the project directory run npm init -y. This configures the directory to work with node.js.

      3) Modify or create .gitignore to ignore node_modules.
            in the .gitignore file you can literally just type node.modules/ 
      
      4)Install the Express package by running npm install express. This will write the Express package dependency in the package.json file and install all the Express code to the node_modules directory.
      
      This is nice because it does a lot of the hard work for you. I believe this is how the package.json and package-lock.json is generated. 
      
      5) Create a file named index.js in the root of the project. This is the entry point that node.js will call when you run your web service.
           I think my start up already has an index.js so I"ll need to remember to change that file name before I complete this first step in my start up. 
           
      6) Add the basic Express JavaScript code needed to host the application static content and the desired endpoints.
      
            Some of the generic code that I think will be applicable to my start up project is this: 
            
            const express = require('express');   (using express package) 
            const app = express();

            // The service port. In production the front-end code is statically hosted by the service on the same port.
            const port = process.argv.length > 2 ? process.argv[2] : 3000; (So this is checking to make sure the argv has a 2 index. I need to ask if the 2 index is code content in the whole folder? Or if it is directed to index.js or port 3000 or how that works. 

            // JSON body parsing using built-in middleware
            app.use(express.json());

            // Serve up the front-end static content hosting
            app.use(express.static('public'));  (The public folder contains all of our html and css and js code that we've done before, so I think the app.use is sort of like saying we want to have the folder 'public' in our app.) 

            // Router for service endpoints
            const apiRouter = express.Router(); 
            
            (I think this helps us access the server and the data stored there later on. I believe the '/api' will generally be             app.use(`/api`, apiRouter);            what you pass into app.use('/api', apiRouter)). 
            
            I'll have to edit my scores function just as we did with the simon. 
            
            // GetScores
            apiRouter.get('/scores', (_req, res) => {    
              res.send(scores); 
                  });  
            
            (So to access the scores already in saved we need to use apiRouter.get('/scores, (_req, res). I believe the req stands for request and the res stands for response. So when we type res.send(scores). I think the res is sort of like the return statement. So it's almost like saying return scores.)
            
                         

            // SubmitScore
            apiRouter.post('/score', (req, res) => { 
            scores = updateScores(req.body, scores); 
            res.send(scores);
             });
             
            (Here we can use apiRouter.post which will basically update the score. The updateScores function will give us the updated scores, and in later code this is called to display it on html. But I think the  res.send(scores) is sending it back to the server or port so that it is also updated globally) 
                        
          
            // Return the application's default page if the path is unknown  
            app.use((_req, res) => { 
             res.sendFile('index.html', { root: 'public' });
              });
            
            (This is super important because it basically gives the default page, for my startup I'd want that to be index.html as well.) 
           
                                  
            app.listen(port, () => {
            console.log(`Listening on port ${port}`);   
             });
            (Is this necessary? I need to ask the TA if we have to have the listening function)
                                        
      
      7) Modify the Simon application code to make service endpoint requests to our newly created HTTP service code.
            This is found in the scroes.js file. I'll write down what the new changes looks like: 
            async function loadScores() {
  const response = await fetch("/api/scores")
  const scores = await response.json()

  // Modify the DOM to display the scores
  
          So I believe the api is the place where everything is stored on the server. I need to learn more if this server is from Amazon Web Servies itself? The port 3000? Remember to ask the TA about that for clarification. 
          
          
     
Javascript notes:

You can only use onload element listener with certain elements of html with javascript. You can change the default bootstrap colors using $warning = 'orange', etc before inserting the bootstrap link (still need to attempt that successfully) 

You can use the value of an element as a toggle. 

You should only have one id per element, but you can access multiple elements at once using things getelementsbyclass feature. 

if the javascript file isn't working or has a syntax error the elements in relation to that javascript page won't show even if they are for different functions. 

You can use getelementbyid for quick changes to the values of elements. When I say value in this sense, I am meaning the innerHTML or innerTEXT. 



another change

This is super cool! I learned a lot! This is the first time I have pushed and pulled from my very own repository on github! I like how you can commit changes and push them and even request to push them on other peoples repos as well! 

START UP ELEVATOR PITCH/KEY FEATURES

Google translate knows over 120 languages. But you know what language it doesn't know? Marshallese!
Never fear, with this new web application, you'll be ready to fly off on a plane and enjoy your next bestest paradise dream vacation in the Marshall Islands. Who knows, maybe flexing your new marshallese vocab around the beach will get you a free meal or two. 

Key Features: 
Secure login over HTTPS
Ability to select flashcards and choose to review or move past them. 
Ability to use a basic translation feature for some common phrases/words
Ability to select the 'friends' page to see other users progress
The progress of the flashcards will be save with their account. 

![325044014_2159605524248028_3713388484677014945_n](https://user-images.githubusercontent.com/123523238/215225773-5a045152-cf2d-4abc-ac01-76427fd74635.jpg)

![325508842_2848545385275725_4877397579029870135_n](https://user-images.githubusercontent.com/123523238/215225785-6a714c9c-06b2-467d-8ab3-248f3c1e2f45.jpg)

![324763463_544165247680560_7013730422290124581_n](https://user-images.githubusercontent.com/123523238/215225790-713bf980-885d-4e40-b7ef-8d293a74b4b6.jpg)


AWS: IP Address: http://18.119.120.226/
Git Bash console instructions: ssh -i (then insert key pair file name located in downloads of user ammon) ubuntu@18.119.120.226

the new ip is 18.189.65.19

This code particularly the first one is important to connect to bootstrap. It might not be as applicalble once bootstrap is downloaded to my computer. 
href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
      
In the main.css file you can edit the different selectors/sections (headers, footers, main, body, etc) and then in the html files, you can connect to bootstrap buttons and such using class "". 

Remember to get the up to date bootstrap links, and use the proper ones to get the right features. Make sure to have an index.html to allow for the deployfile to work properly. 


HTML:

Attributes: 
<p id="hello" class="greeting">Hello world</p>

svg	Scalable vector graphic content
iframe	Inline frame of another HTML page

&	&amp;
<	&lt;
>	&gt;
"	&quot;
'	&apos;
😀	&#128512;


form	Input container and submission	<form action="form.html" method="post">
fieldset	Labeled input grouping	<fieldset> ... </fieldset>
input	Multiple types of user input	<input type="" />
select	Selection dropdown	<select><option>1</option></select>
optgroup	Grouped selection dropdown	<optgroup><option>1</option></optgroup>
option	Selection option	<option selected>option2</option>
textarea	Multiline text input	<textarea></textarea>
label	Individual input label	<label for="range">Range: </label>
output	Output of input	<output for="range">0</output>
meter	Display value with a known range	<meter min="0" max="100" value="50"></meter>
      
 radio	Exclusive selection
      
name	The name of the input. This is submitted as the name of the input if used in a form
disabled	Disables the ability for the user to interact with the input
value	The initial value of the input
required	Signifies that a value is required in order to be valid
      
@media (max-height: 700px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
      
 Null	The type of a variable that has not been assigned a value.
Undefined	The type of a variable that has not been defined.
    
 Object	A collection of properties represented by name value pairs. Values can be of any type.	{a:3, b:'fish'}
  
 JSON	A lightweight data-interchange format used to share information across programs.	{"a":3, "b":"fish"}
 
 2 + '3';
// OUTPUT: '23'
2 * '3';
// OUTPUT: 6
[2] + [3];
// OUTPUT: '23'
true + null;
// OUTPUT: 1
true + undefined;
// OUTPUT: NaN
      
      
const a = [1, 2, 3, 4];

// standard function syntax
a.sort(function (v1, v2) {
  return v1 - v2;
});

// arrow function syntax
a.sort((v1, v2) => v1 - v2);
      
function makeClosure(a) {
  a = 'a2';
  const b = 'b2';
  return () => [a, b];
}

const a = 'a';
const b = 'b';

const closure = makeClosure(a);
      
console.log(closure());
// OUTPUT: ['a2', 'b2']

console.log(a, b);
// OUTPUT: 'a' 'b'

some	Run a function to test if any items match	a.some(i => 1 < 1)
                                                                  
values	Creates an iterator for use with a for of loop	for (i of a.values()) {...}
                                                                  
entries	Returns an array of key value pairs
keys	Returns an array of keys
values	Returns an array of values
                                                                  
const obj = {
  a: 3,
  b: 'fish',
};

console.log(Object.entries(obj));
// OUTPUT: [['a', 3], ['b', 'fish']]
console.log(Object.keys(obj));
// OUTPUT: ['a', 'b']
console.log(Object.values(obj));
// OUTPUT: [3, 'fish']
                                                                  
function Person(name) {
  return {
    name: name,
    log: function () {
      console.log('My name is ' + this.name);
    },
  };
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich    
                                                                  
Any function that returns an object is considered a constructor and can be invoked with the new operator.
                                                                  
class Person {
  constructor(name) {
    this.name = name;
  }

  log() {
    console.log('My name is ' + this.name);
  }
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
You can make properties and functions of classes private by prefixing them with a #.
                                                                  
                                                                  
class Employee extends Person {
  constructor(name, position) {
    super(name);
    this.position = position;
  }

  print() {
    return super.print() + '. I am a ' + this.position;
  }
}

JSON
                                                                  
string	"crockford"
number	42
boolean	true
array	[null,42,"crockford"]
object	{"a":1,"b":"crockford"}
null	null
                                                                  
 {
  "class": {
    "title": "web programming",
    "description": "Amazing"
  },
  "enrollment": ["Marco", "Jana", "فَاطِمَة"],
  "start": "2025-02-01",
  "end": null
}
 
JSON is always encoded with UTF-8. This allows for the representation of global data.

Converting to JavaScript
You can convert JSON to, and from, JavaScript using the JSON.parse and JSON.stringify functions.

const obj = { a: 2, b: 'crockford', c: undefined };
const json = JSON.stringify(obj);
const objFromJson = JSON.parse(json);

console.log(obj, json, objFromJson);

// OUTPUT:
// {a: 2, b: 'crockford', c: undefined}
// {"a":2, "b":"crockford"}
// {a: 2, b: 'crockford'}
Note that in this example, JSON cannot represent the JavaScript undefined object and so it gets dropped when converting from JavaScript to JSON.
                                                                  
  
 REGULAR EXPRESSIONS
                                                                  
 const objRegex = new RegExp('ab*', 'i');
const literalRegex = /ab*/i;
The string class has several functions that accept regular expressions. This includes match, replace, search, and split. For a quick test to see if there is a match you can use the regular expression object's test function.

const petRegex = /(dog)|(cat)|(bird)/gim;
const text = 'Both cats and dogs are pets, but not rocks.';

text.match(petRegex);
// RETURNS: ['cat', 'dog']

text.replace(petRegex, 'animal');
// RETURNS: Both animals and animals are pets, but not rocks.

petRegex.test(text);
// RETURNS: true
      
REST
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true
      
SPREAD
function person(firstName, lastName) {
  return { first: firstName, last: lastName };
}

const p = person(...['Ryan', 'Dahl']);
console.log(p);
// OUTPUT: {first: 'Ryan', last: 'Dahl'}      
      
DESTRUCTURING
      
const a = [1, 2, 4, 5];

// destructure the first two items from a, into the new variables b and c
const [b, c] = a;

console.log(b, c);
// OUTPUT: 1, 2
      
const [b, c, ...others] = a;

console.log(b, c, others);
// OUTPUT: 1, 2, [4,5]
      
const o = { a: 1, b: 'animals', c: ['fish', 'cats'] };

const { a, c } = o;

console.log(a, c);
// OUTPUT 1, ['fish', 'cats']
      
const o = { a: 1, b: 'animals', c: ['fish', 'cats'] };

const { a: count, b: type } = o;

console.log(count, type);
// OUTPUT 1, animals      
      
const { a, b = 22 } = {};
const [c = 44] = [];

console.log(a, b, c);
// OUTPUT: undefined, 22, 44                                                                  
                                                                  
 EXCEPTIONS
      
function connectDatabase() {
  throw new Error('connection error');
}

try {
  connectDatabase();
  console.log('never executed');
} catch (err) {
  console.log(err);
} finally {
  console.log('always executed');
}

// OUTPUT: Error: connection error
//         always executed   
      
      
DOM
      
function displayElement(el) {
  console.log(el.tagName);
  for (const child of el.children) {
    displayElement(child);
  }
}

displayElement(document); 
      
      
const listElements = document.querySelectorAll('p');
for (const el of listElements) {
  console.log(el.textContent);
}
      
      
 function insertChild(parentSelector, text) {
  const newChild = document.createElement('div');
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}

insertChild('#courses', 'new course');
      
      
const submitDataEl = document.querySelector('#submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});
      
      
<button onclick='alert("clicked")'>click me</button>      
      
promises
      
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});
      
coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed      
      
async function cow() {
  return new Promise((resolve) => {
    resolve('moo');
  });
}
console.log(cow());
// OUTPUT: Promise {<pending>}
      
      
console.log(cow());
// OUTPUT: Promise {<pending>}

console.log(await cow());
// OUTPUT: moo 
      
      
chmod +x deploy.sh (console command that makes script executable) 
      
sudo - Execute a command as a super user (admin)
ssh - Create a secure shell on a remote computer
scp - Securely copy files to a remote computer
      
ls - List files      
