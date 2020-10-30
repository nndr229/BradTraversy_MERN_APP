const express = require('express');
const router = express.Router();

//Route GET api/auth

router.get('/', (req, res) => res.send('Auth Route'));

module.exports = router;
