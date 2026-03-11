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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});