const { jwtCreate } = require('../utils/jwt');
const { loginUser } = require('../utils/setLoginUser');
const User = require('../models/user');
exports.auth = async (req, res, next) => {
  try {
    const profile = req.kakao;
    const [accessToken, refreshToken] = await jwtCreate(profile);

    res.json({
      ok: true,
      loginUser: loginUser(accessToken, refreshToken),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.tutorial = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { finishTutorial } = req.body;
    await User.update({ finishTutorial }, { where: { id: userId } });
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
