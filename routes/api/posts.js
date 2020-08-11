const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

// @route  POST api/posts
// @desc   Add a post
// @access Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = {
        text: req.body.text,
        avatar: user.avatar,
        name: user.name,
        user: req.user.id,
      };
      const post = new Post(newPost);
      await post.save();
      return res.json(post);
    } catch (e) {
      console.log(e.message);
      res.status(500).send('server error');
    }
  }
);

// @route  get api/posts
// @desc   get all posts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: 'server error' });
  }
});

// @route  GET api/posts/:postId
// @desc   get post by id
// @access Private
router.get('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'No post found for this id' });
    }
    return res.json(post);
  } catch (e) {
    console.log(e.message);
    if (e.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'No post found for this id' });
    }
    res.status(500).send('server error');
  }
});

// @route  DELETE api/posts/:postId
// @desc   delete post by id
// @access Private
router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'No post found for this id' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'User not authorized' });
    }
    await post.remove();
    return res.json({ msg: 'Post removed' });
  } catch (e) {
    console.log(e.message);
    if (e.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'No post found for this id' });
    }
    res.status(500).send('server error');
  }
});

// @route  Put api/posts/like/:id
// @desc   like a post
// @access Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post is already liked
    let isMatch = post.likes.filter(
      (like) => like.user.toString() == req.user.id
    );
    if (isMatch.length > 0) {
      return res.status(400).json({ msg: 'post is already liked by the user' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (e) {
    console.log(e.message);
    res.status(500).send('server error');
  }
});

// @route  DELETE api/posts/unlike/:id
// @desc   unlike a post
// @access Private
router.delete('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post is not liked by the user' });
    }

    //Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    return res.json(post.likes);
  } catch (e) {
    console.log(e.message);
    res.status(500).send('server error');
  }
});

// @route  POST api/posts/comment/:postId
// @desc   comment a post
// @access Private

router.post(
  '/comment/:postId',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.postId);
      let newComment = {
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
      };
      post.comments.unshift(newComment);
      await post.save();
      return res.json(post.comments);
    } catch (e) {
      console.log(e.message);
      return res.status(500).send('server error');
    }
  }
);

// @route  Delete api/posts/comment/:postId/:commentId
// @desc   Delete a comment
// @access Private
router.delete('/comment/:postId/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    //pull the comment
    const comment = await post.comments.find(
      (comment) => comment.id == req.params.commentId
    );

    //make sure comment exist
    if (!comment) {
      return res.status(404).json({ msg: 'Comment doesnt exist' });
    }

    //check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorised' });
    }

    //remove comment
    post.comments.splice(comment, 1);
    await post.save();
    return res.json(post.comments);
  } catch (e) {
    console.log(e.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
