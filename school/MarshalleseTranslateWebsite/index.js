// const { WebSocketServer } = require('ws');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser'); 
const DB = require('./database.js'); 
const bcrypt = require('bcrypt'); 
const {peerProxy} = require('./peerProxy.js'); 
// const express = express(); 

const authCookieName = 'token'; 

// Serve up our webSocket client HTML
// app.use(express.static('./public'));

const port = process.argv.length > 2 ? process.argv[2] : 4000;
// server = app.listen(port, () => {
//   console.log(`Listening on ${port}`);
// });
// const httpService = app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });


// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);
    // localStorage.setItem('score', user.score);
    // localStorage.setItem("first", user["first"]);
    // localStorage.setItem('second', user.second);
    // localStorage.setItem('third', user.third);
    // localStorage.setItem('fourth', user.fourth);
    // localStorage.setItem('fifth', user.fifth);
    // localStorage.setItem('sixth', user.sixth);

    // Set the cookie
    setAuthCookie(res, user.token);
    
    res.send({
      // first: user.first, 
      id: user._id,
      // score: user.score
    });
  }
});



// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    // console.log('plassssss'); 
    // console.log(user); 
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      // localStorage.setItem('score', user.score);
      // localStorage.setItem('first', user.first);
      // localStorage.setItem('second', user.second);
      // localStorage.setItem('third', user.third);
      // localStorage.setItem('fourth', user.fourth);
      // localStorage.setItem('fifth', user.fifth);
      // localStorage.setItem('sixth', user.sixth);
      // res.send({ first: user.first, id: user._id, score: user.score });
            res.send({id: user._id});

      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send(user); 
    // res.send({ email: user.email, score: user.score, authenticated: token === user.token });
    return;
  }

  res.status(404).send({ msg: 'Unknown' });
});

apiRouter.get('/userr/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    // res.send(user); 
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }

  res.status(404).send({ msg: 'Unknown' });
});



// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetScores
secureApiRouter.get('/scores', async (req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});



// SubmitScore
secureApiRouter.post('/score', async (req, res) => {
  await DB.addScore(req.body.email, req.body.score);
  const scores = await DB.getHighScores();
  res.send(scores);
});



secureApiRouter.patch('/test/:email', async(req, res) => {
  console.log(req.params.email); 
  console.log(req.body.test); 
  console.log(req.body.id); 
  console.log(req.body);
  console.log(req.body.email);  
  await DB.update_user_data(req.body.email, req.body.score, req.body.first, req.body.second, req.body.third, req.body.fourth, req.body.fifth, req.body.sixth); 
  res.send('hello');//`{"test":"${req.params.email}"}`);
});

secureApiRouter.patch('/friend/:email', async(req, res) => {
  console.log(req.body); 
  console.log(req.body.email); 
  console.log(req.body.value); 
  console.log(req.body.key); 
  await DB.update_user_friends(req.body.email, req.body.key, req.body.value, req.body.valuee); 
  res.send("hello"); 
}); 

//update current user data
// secureApiRouter.patch('/data/:data', async (req, res) => {
//   console.log("it connected to patch"); 
//   await DB.update_user_data(req.body.id, req.body.email, req.body.score, req.body.first, req.body.second, req.body.third, req.body.fourth, req.body.fifth, req.body.sixth);
//   const user = await DB.getUser(req.body.email); 
//   res.send(user); 
//   return; 
// });
// update user with new score info
// secureApiRouter.put('/score', async (req, res) => {
//   await DB.addScore(req.body);
//   const scores = await DB.getHighScores();
//   res.send(scores);
// });

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);