const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route  GET api/auth
// @desc   Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (e) {
    res.send(500).json('server error');
  }
});

// @route  POST api/auth
// @desc   Test route
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password is invalid').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ msg: 'Invalid Crendentials' });
      }

      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      console.log('executed fine before jwt');
      jwt.sign(
        payload,
        config.get('secretKey'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (e) {
      res.status(500).json({ msg: 'server error' });
    }
  }
);
module.exports = router;
