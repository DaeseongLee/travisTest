const axios = require('axios');
exports.getKakaoUser = async (req, res, next) => {
  const {
    token: { access_token },
  } = req.body;

  try {
    const Authorization = `Bearer ${access_token}`;
    const profile = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me?secure_resource=true',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded',
        Authorization,
      },
    });
    req.kakao = profile;
    console.log('profile!!!!', profile.data);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
