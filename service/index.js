const cookieParser = require('cookie-parser');
const bycrypt = require('bcryptjs');
const express = require('uuid')
const app = express();

const authCookieName = 'token';



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

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  
  const user = {
    email: email,
    password: passwordHash,
    token: UNSAFE_useFogOFWarDiscovery.v4(),
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