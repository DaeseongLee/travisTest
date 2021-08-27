const jwt = require('jsonwebtoken');
const { getNewAuth } = require('../utils/renewAuth');
const { loginUser } = require('../utils/setLoginUser');

exports.authenticateJWT = async (req, res, next) => {
  try {
    const [accessToken, refreshToken] = req.headers['authorization'].split(',');

    console.log('accessToken!!!', accessToken);
    console.log('refreshToken!!!', refreshToken);

    const iAccessToken = verifyToken(accessToken);
    const irefreshToken = verifyToken(refreshToken);

    console.log('message1', iAccessToken);
    console.log('message2', irefreshToken);

    //유효하지 않는 토큰:signature가 맞지 않음
    if (
      iAccessToken === 'invalid signature' ||
      irefreshToken === 'invalid signature'
    ) {
      return res.status(403).json({ ok: false, message: 'invalid token' });
    }

    //잘못된 형식의 토큰
    if (iAccessToken === 'jwt malformed' || irefreshToken === 'jwt malformed') {
      return res.status(403).json({ ok: false, message: 'malformed token' });
    }

    //두토큰다 유효기간이 끝난 겨우
    if (iAccessToken === 'jwt expired' && irefreshToken === 'jwt expired') {
      return res.status(403).json({ ok: false, message: 'invalid token' });
    }

    if (iAccessToken === 'jwt expired') {
      console.log('accessToken Expired!!!');
      if (irefreshToken) {
        const newAuth = await getNewAuth(refreshToken);

        if (!newAuth)
          return res.status(403).json({ ok: false, message: 'invalid token' });

        req.loginUser = loginUser(newAuth.accessToken, newAuth.refreshToken);
        req.userId = newAuth.id;
        req.userInfo = {
          id: newAuth.id,
          nickname: newAuth.nickname,
          img: newAuth.img,
          communityNickname: newAuth.communityNickname,
        };
        next();
      } else {
        res.json({
          ok: false,
          needsLogin: true,
          message: '로그인이 필요합니다.',
        });
      }
    } else {
      req.loginUser = loginUser(accessToken, refreshToken);
      req.userId = iAccessToken.id;
      req.userInfo = {
        id: iAccessToken.id,
        nickname: iAccessToken.nickname,
        img: iAccessToken.img,
        communityNickname: iAccessToken.communityNickname,
      };
      next();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
