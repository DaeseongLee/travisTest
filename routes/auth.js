const express = require('express');
const router = express.Router();

const { getKakaoUser } = require('../middlewares/getKakaoUser');
const { authenticateJWT } = require('../middlewares/authenticateJWT');
const { auth, tutorial } = require('../controllers/auth');

router.post('/kakaoLogin', getKakaoUser, auth);

router.put('/tutorial', authenticateJWT, tutorial);

module.exports = router;
