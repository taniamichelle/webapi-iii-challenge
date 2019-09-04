const express = require('express');

// import userRouter
const userRouter = require('./users/userRouter');

const server = express();
// use express built-in middleware globally 
server.use(express.json());

// route handlers
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// use middleware locally
server.use('/api/users', userRouter);

// use custom middleware locally
// server.use('/users', validateUser, validateUserId, userRouter);
// server.use('/posts', validatePost, postRouter);

// custom middleware
// function logger(req, res, next) {

// };


module.exports = server;
