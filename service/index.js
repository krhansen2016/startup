const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const { v4: uuidv4 } = require('uuid')
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
    token: uuidv4(),
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

apiRouter.get('/posts', verifyAuth, (_req, res) => {
  res.send(posts);
});

apiRouter.post('/post', verifyAuth, (req, res) => {
  posts.push(req.body);
  res.send(posts);
});

apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  }
  else {
    const user = await createUser(req.body.email, req.body.password);
    users.push(user);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email)
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuidv4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.get('/emoji-groups', async (_req, res) => {
  try {
    const response = await fetch('https://emojihub.yurace.pro/api/groups');
    const groups = await response.json();
    res.send(groups);
  } catch (err) {
    console.error("Emoji group fetch failed:", err);
    res.status(500).send({ error: "Failed to fetch emoji groups" });
  }
});

apiRouter.get('/emojis/group/:group', async (req, res) => {
  try {
    const group = req.params.group;

    const response = await fetch(
      `https://emojihub.yurace.pro/api/all/group/${encodeURIComponent(group)}`
    );

    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.error("Emoji fetch failed:", err);
    res.status(500).send({ error: "Failed to fetch emojis" });
  }
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});