const bcrypt = require('bcryptjs');
const auth = require('basic-auth');

const User = require('../models/User');

const BCRYPT_ROUND = 10;

const hashPassword = (password) =>
  new Promise((res, rej) => {
    bcrypt.genSalt(BCRYPT_ROUND, (errSalt, salt) => {
      if (errSalt) rej(errSalt);
      bcrypt.hash(password, salt, (errHash, hash) => {
        if (errHash) rej(errHash);
        res(hash);
      });
    });
  });

const checkPassword = (password, hash) =>
  new Promise((res, rej) => {
    bcrypt.compare(password, hash, (err, success) => {
      if (err) rej(err);
      res(success);
    });
  });

const CheckPassword = async (req, res) => {
  const authHeader = auth(req);

  if (!authHeader) return res.status(400).send();

  const user = await User.query().findOne({ username: authHeader.name });

  req.log.trace({ input: authHeader, user: user || 'NOT FOUND' });

  if (user) {
    const success = await checkPassword(authHeader.pass, user.password);
    req.log.trace({ checkPassword: success });
    if (success) return res.status(200).send();
  }

  return res.status(404).send();
};

module.exports.RegisterUser = async function RegisterUser(req, res) {
  const { username, password, email, name } = req.body;
  const hash = await hashPassword(password);
  await User.query().insert({
    username,
    password: hash,
    email,
    name,
  });
  res.xsend('success', req.body);
};

module.exports.CheckPassword = CheckPassword;
