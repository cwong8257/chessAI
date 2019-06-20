const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const error = {
        message: 'Email already exists'
      };

      return res.status(400).json(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hash,
      username
    });
    const savedUser = await newUser.save();

    return res.json(savedUser);
  } catch (err) {
    return console.log(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });

    if (!user) {
      const error = {
        message: 'User not found'
      };

      return res.status(404).json(error);
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      const error = {
        message: 'Password incorrect'
      };

      return res.status(400).json(error);
    }

    const { username, firstName, lastName, email } = user;
    const payload = { username, firstName, lastName, email };
    const token = jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, { expiresIn: 3600 });

    return res.json({ success: true, token: `Bearer ${token}` });
  } catch (err) {
    return console.log(err);
  }
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, username, firstName, lastName, email } = req.user;
  res.json({ id, username, firstName, lastName, email });
});

module.exports = router;
