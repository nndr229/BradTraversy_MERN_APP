const express = require('express');
const router = express.Router();

//Route GET api/posts

router.get('/', (req, res) => res.send('Posts Route'));

module.exports = router;
