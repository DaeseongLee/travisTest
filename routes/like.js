const express = require('express');
const router = express.Router();
const { like } = require('../controllers/like');
const { authenticateJWT } = require('../middlewares/authenticateJWT');

//Like등록 || 삭제
// authenticateJWT
router.put('/:routineId', authenticateJWT, like);

module.exports = router;
