const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const { v4: uuidv4 } = require('uuid')
const app = express();
const DB = require('./database.js');
const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const { peerProxy } = require('./peerProxy.js');

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// user login code here

apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  }
  else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email)
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuidv4();
      await DB.updateUser(user);
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
    await DB.updateUserRemoveAuth(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const token = req.cookies[authCookieName];

  if (!token) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }

  const user = await findUser('token', token);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuidv4(),
    profilePic: "default_profile2.0.jpg",
  };
  await DB.addUser(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return await DB.getUserByToken(value);
  }
  return await DB.getUser(value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
}

// posts code here

apiRouter.get('/profile', verifyAuth, (req, res) => {
  const user = req.user;
  res.send({ email: user.email, profilePic: user.profilePic });
});

apiRouter.post('/profile/pic', verifyAuth, async (req, res) => {
  const user = req.user;
  user.profilePic = req.body.profilePic;
  await DB.updateUser(user);
  res.send({ profilePic: user.profilePic });
});

apiRouter.get('/posts', verifyAuth, async (_req, res) => {
  const posts = await DB.getPosts();
  res.send(posts);
});

apiRouter.post('/post', verifyAuth, async (req, res) => {
  const newPost = {
    ...req.body,
    id: uuidv4(),
    userEmail: req.user.email
  };
  await DB.addPost(newPost);

  const event = {
    type: 'postCreated',
    value: newPost,
  };

  socketServer.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(event));
    }
  });

  const posts = await DB.getPosts();
  res.send(posts);
});

apiRouter.post('/posts/:id/reaction', verifyAuth, async (req, res) => {
  const post = await DB.getPostById(req.params.id);

  if (!post) return res.status(404).send({ msg: "Post not found" });

  const { emoji } = req.body;

  if (!post.reactions) post.reactions = [];

  const existing = post.reactions.find(r => r.emoji === emoji);

  if (existing) {
    existing.count += 1;
  } else {
    post.reactions.push({ emoji, count: 1 });
  }

  await DB.updatePost(post);

  res.send(post);
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

apiRouter.get('/emojis/category/:category', async (req, res) => {
  try {
    const group = req.params.category
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

    const response = await fetch(
      `https://emojihub.yurace.pro/api/all/group/${encodeURIComponent(group)}`
    );

    if (!response.ok) {
      throw new Error(`Emoji API returned ${response.status}`);
    }

    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.error("Emoji fetch failed:", err);
    res.status(500).send({ error: "Failed to fetch emojis" });
  }
});

// designs code here

apiRouter.get('/designs', verifyAuth, async (req, res) => {
  const user = req.user;
  const designs = await DB.getDesignsByUser(user.email);
  res.send(designs);
});

apiRouter.post('/designs', verifyAuth, async (req, res) => {
  const user = req.user;

  const newDesign = {
    id: uuidv4(),
    userEmail: user.email,
    name: "Untitled Design",
    design: req.body
  };

  await DB.addDesign(newDesign);
  res.send(newDesign);
});

apiRouter.put('/designs/:id/name', verifyAuth, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).send({ msg: "Name is required" });
  }

  await DB.updateDesignName(id, user.email, name);
  res.send({ id, name });
});


apiRouter.delete('/designs/:id', verifyAuth, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  await DB.deleteDesign(id, user.email);
  res.status(204).end();
});

// Other code
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const socketServer = peerProxy(httpService);
