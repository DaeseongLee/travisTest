const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Op } = require('sequelize');

exports.jwtCreate = async (profile) => {
  const basicInfo = {
    email: profile.data?.kakao_account?.email || profile.kakao_account?.email,
    nickname:
      profile.data?.kakao_account?.profile.nickname ||
      profile.kakao_account?.profile.nickname,
    img:
      profile.data?.kakao_account?.profile.profile_image_url ||
      profile.kakao_account?.profile.profile_image_url,
    communityNickname: null,
  };

  const snsId = profile.data?.id || profile.id;

  const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESHTOKEN_EXPIRE,
  });

  try {
    const exUser = await User.findOne({
      where: { [Op.and]: [{ snsId }, { provider: 'kakao' }] },
    });

    if (exUser) {
      await User.update(
        {
          ...basicInfo,
          refreshToken,
        },
        {
          where: { snsId },
        }
      );
      basicInfo.communityNickname = exUser.communityNickname
        ? exUser.communityNickname
        : null;
      basicInfo.id = exUser.id;
      basicInfo.finishTutorial = exUser.finishTutorial;
    } else {
      const user = await User.create({
        ...basicInfo,
        snsId,
        provider: 'kakao',
        refreshToken,
      });
      basicInfo.id = user.id;
      basicInfo.finishTutorial = false;
    }
    const accessToken = jwt.sign(basicInfo, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESSTOKEN_EXPIRE,
    });
    return [accessToken, refreshToken];
  } catch (error) {
    console.error(error);
  }
};
