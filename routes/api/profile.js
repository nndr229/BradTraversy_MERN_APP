const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

//Route GET api/profile/me

router.get('/me', authMiddleware, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			('user', ['name', 'avatar'])
		);

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

//Route POST api/profile
//Update ot create a user profile
router.post(
	'/',
	[
		authMiddleware,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'Skills is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;

		//Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (githubusername) profileFields.githubusername = githubusername;
		if (status) profileFields.status = status;
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}

		profileFields.social = {};
		if (facebook) profileFields.social.facebook = facebook;
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (instagram) profileFields.social.instagram = instagram;
		if (linkedin) profileFields.social.linkedin = linkedin;

		try {
			//req.user.id comes from the token
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}

			//create new save if no profile
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server error');
		}
	}
);

//Route GET api/profile

router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

//Route GET api/profile/user/:user_id

router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar']);

		if (!profile) return res.status(400).json({ msg: 'Profile not found' });

		res.json(profile);
	} catch (err) {
		console.log(err.message);

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Server error');
	}
});

//Delete api/profile
//Delete profile user and post

router.delete('/', authMiddleware, async (req, res) => {
	try {
		await Post.deleteMany({ user: req.user.id });

		await Profile.findOneAndRemove({ user: req.user.id });

		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

//Put request to api/profile/experience
router.put(
	'/experience',
	[
		authMiddleware,
		[
			check('title', 'title is required').not().isEmpty(),
			check('company', 'Company is required').not().isEmpty(),
			check('from', 'From date is required').not().isEmpty(),
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
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server error');
		}
	}
);

//Delete api/profile/experience/:exp_id
//Delete experience from profile

router.delete('/experience/:exp_id', authMiddleware, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);

		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

//Put request to api/profile/education
router.put(
	'/education',
	[
		authMiddleware,
		[
			check('school', 'School is required').not().isEmpty(),
			check('degree', 'Degree is required').not().isEmpty(),
			check('fieldofstudy', 'Field Of Study is required').not().isEmpty(),
			check('from', 'From date is required').not().isEmpty(),
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

		const newEdu = {
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
			profile.education.unshift(newEdu);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server error');
		}
	}
);

//Delete api/profile/education/:edu_id
//Delete education from profile

router.delete('/education/:edu_id', authMiddleware, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.edu_id);

		profile.education.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);

		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

router.get('/github/:username', async (req, res) => {
	try {
		const uri = encodeURI(
			`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
		);
		const headers = {
			'user-agent': 'node.js',
			Authorization: `token ${config.get('githubToken')}`,
		};

		const gitHubResponse = await axios.get(uri, { headers });
		console.log(gitHubResponse);
		if (gitHubResponse.status !== 200) {
			return res.status(404).json({ msg: 'Github profile not found' });
		}
		return res.json(gitHubResponse.data);
	} catch (err) {
		console.error(err.message);
		return res.status(404).json({ msg: 'No Github profile found' });
	}
});

module.exports = router;
