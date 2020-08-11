const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator/check');
const request = require('request');
const config = require('config');

// @route  GET api/profile/me
// @desc   retrieve current profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      res.status(401).send('No profile for the user');
    }
    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send('server error');
  }
});

// @route  POST api/profile
// @desc   Create or Update profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is required').not().isEmpty(),
      check('skills', 'skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (skills)
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;

    profileFields.social = {};
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);
      await profile.save();

      return res.json(profile);
    } catch (e) {
      res.status(500).send('server error');
    }
  }
);

// @route  GET api/profile
// @desc   Retrieve all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    return res.json(profiles);
  } catch (e) {
    console.log(e.message);
    res.status(500).send('server error');
  }
});

// @route  GET api/profile/user/:userId
// @desc   Retrieve profile by userid
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (e) {
    console.log(e.message);
    if (e.kind == 'ObjectId')
      return res.status(400).json({ msg: 'Profile not found' });
    res.status(500).send({ msg: 'Server Error' });
  }
});

// @route  DELETE api/profile
// @desc   delete profile user and posts
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove Posts
    await Post.deleteMany({ user: req.user.id });
    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    return res.json({ msg: 'user Deleted' });
  } catch (e) {
    console.log(e.message);
    res.status(500).send('server error');
  }
});

// @route  PUT api/profile/experience
// @desc   Add experience
// @access Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'title is required').not().isEmpty(),
      check('company', 'company is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('from', 'from date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      console.log(profile);
      await profile.save();
      return res.json(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send('server error');
    }
  }
);

// @route  DELETE api/profile/experience/:expId
// @desc   Delete experience
// @access Private
router.delete('/experience/:expId', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience = profile.experience.filter(
      (item) => item.id != req.params.expId
    );
    await profile.save();
    return res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send('server error');
  }
});

// @route  PUT api/profile/education
// @desc   Add education
// @access Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'school is required').not().isEmpty(),
      check('degree', 'degree is required').not().isEmpty(),
      check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
      check('from', 'from Date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEducaton = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducaton);
      await profile.save();
      return res.json(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send('server error');
    }
  }
);

// @route  DELETE api/profile/education/:eduId
// @desc   delete education
// @access Private
router.delete('/education/:eduId', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    console.log(profile);
    profile.education = profile.education.filter((item) => {
      console.log(req.params.eduId);
      return item.id != req.params.eduId;
    });
    //console.log(profile);
    await profile.save();
    return res.json(profile);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send('server error');
  }
});

// @route  GET api/profile/github/:username
// @desc   Get user repos from Github
// @access Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: {
        'user-agent': 'node-js',
      },
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);
      console.log('git', body);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
