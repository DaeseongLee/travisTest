const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authenticateJWT');
const { tokens } = require('../controllers/tokens');

router.get('/', authenticateJWT, tokens);

module.exports = router;
