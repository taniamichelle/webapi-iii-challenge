const express = require('express');

const server = express();

server.use(express.json()); // use express built-in middleware globally 
server.use(logger); // use custom middleware globally

const userRouter = require('./users/userRouter'); // import userRouter
server.use('/api/users', userRouter); // apply userRouter middleware

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// custom global middleware
function logger(req, res, next) { // req + res are objects and next is a cb function
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

module.exports = server;
