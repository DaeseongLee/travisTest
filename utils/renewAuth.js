const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getNewAuth = async function (refreshToken) {
  const info = await User.findOne({
    attributes: ['id', 'email', 'nickname', 'img', 'communityNickname'],
    where: { refreshToken },
  });

  if (info) {
    const basicInfo = {
      id: info.id,
      email: info.email,
      nickname: info.nickname,
      img: info.img,
      communityNickname: info.communityNickname,
    };

    console.log('basicInfo!!!!@!@!@', basicInfo);
    const accessToken = jwt.sign(basicInfo, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESSTOKEN_EXPIRE,
    });
    return {
      accessToken,
      id: info.id,
      nickname: info.nickname,
      img: info.img,
      communityNickname: info.communityNickname,
    };
  }
  return null;
};
