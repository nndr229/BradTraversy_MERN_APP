const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//Route POST api/posts
//Create a POST
router.post(
	'/',
	[authMiddleware, check('text', 'Text is required').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});
			const post = await newPost.save();

			res.json(post);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//Route GET api/posts
//Get all POSTS
router.get('/', authMiddleware, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

//Route GET api/posts/:id
//Get single POST by  ID
router.get('/:id', authMiddleware, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		res.json(post);
	} catch (err) {
		console.log(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}

		res.status(500).send('Server error');
	}
});

//Route DELETE api/posts/:id
//DELETE POST BY ID
router.delete('/:id', authMiddleware, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await post.remove();

		res.json({ msg: 'Post removed' });
	} catch (err) {
		console.log(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server error');
	}
});

//Route PUT api/posts/like/:id
//LIKE POST BY ID
router.put('/like/:id', authMiddleware, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		) {
			return res.status(400).json({ msg: 'Post already liked' });
		}

		post.likes.unshift({ user: req.user.id });

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

//Route PUT api/posts/unlike/:id
//UNLIKE POST BY ID
router.put('/unlike/:id', authMiddleware, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id)
				.length === 0
		) {
			return res.status(400).json({ msg: 'Post has not yet been liked' });
		}

		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);

		post.likes.splice(removeIndex, 1);

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

//Route POST api/posts/comment/:id
//Create a comment on a post
router.post(
	'/comment/:id',
	[authMiddleware, check('text', 'Text is required').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const post = await Post.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			};

			post.comments.unshift(newComment);

			await post.save();

			res.json(post.comments);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//Route DELETE api/posts/comment/:id/:comment_id
//Delete Comment
router.delete('/comment/:id/:comment_id', authMiddleware, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);

		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		const removeIndex = post.comments
			.map((comment) => comment.user.toString())
			.indexOf(req.user.id);

		post.comments.splice(removeIndex, 1);

		await post.save();

		res.json(post.comments);
	} catch (err) {
		console.log(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post/Comment not found' });
		}
		res.status(500).send('Server error');
	}
});

module.exports = router;
