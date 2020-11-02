const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//Route GET api/auth

router.get('/', authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

//Post request tp api/auth
//Authenticate user and get token

router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			//See if user already exists
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] });
			}

			//Return Json WebToken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
