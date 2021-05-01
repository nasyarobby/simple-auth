const bcrypt = require('bcryptjs');
const User = require('../models/User');

const hashPassword = (password) =>
  new Promise((res, rej) => {
    bcrypt.genSalt(10, (errSalt, salt) => {
      if (errSalt) rej(errSalt);
      bcrypt.hash(password, salt, (errHash, hash) => {
        if (errHash) rej(errHash);
        res(hash);
      });
    });
  });

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
