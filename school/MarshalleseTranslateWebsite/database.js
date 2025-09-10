
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://zingaboy:elzinga11@cluster0.syujyru.mongodb.net`;

const client = new MongoClient(url);
const userCollection = client.db('startup').collection('user');
const scoreCollection = client.db('startup').collection('score');

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    score: 0, 
    first: 0, 
    second: 0, 
    third: 0, 
    fourth: 0, 
    fifth: 0, 
    sixth: 0
  };
  await userCollection.insertOne(user);
  return user;
}

async function update_user_data(user, scoree, first, second, third, fourth, fifth, sixth){
  const filter = {email: user}; 
  const update = {$set: {score: scoree, first: first, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth}};
  // const update = {$set: {email: email, score: score, first: first, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth}};
  const options = {upsert: true}; 
  await userCollection.updateOne(filter, update, options); 
  return user; 
}

async function update_user_friends(user, friend, value, valuee){
  let friend_key = friend; 
  let obj = {}; 
  obj[friend_key] = value; 
  const filter = {email: user}; 
  const update = {$set: obj }; 
  const options = {upsert: true}; 
  await userCollection.updateOne(filter, update, options);
  let send_request = user; 
  let send_obj = {}; 
  send_obj[send_request] = valuee; 
  const fil = {email: friend}; 
  const up = {$set: send_obj}; 
  const opt = {upsert: true}; 
  await userCollection.updateOne(fil, up, opt); 
  return user; 
}

async function addScore(email, score) {
  const filter = {email: email};
  const update = {$set: {score: score}};
  const options = {upsert: true}; 
  await scoreCollection.updateOne(filter, update, options);
  return email; 
}

function getHighScores() {
  const query = {};
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  // const cursor = scoreCollection; 
  return cursor.toArray();
  // return scoreCollection; 
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
  update_user_data, 
  update_user_friends
};