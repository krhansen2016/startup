const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid')
const app = express();

const authCookieName = 'token';

let users = [];
let posts = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/posts', verifyAuth, (_req, res) => {
  res.send(posts);
});

apiRouter.post('/post', verifyAuth, (req, res) => {
  posts.push(req.body);
  res.send(posts);
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  }
  else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };

  return user;
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});