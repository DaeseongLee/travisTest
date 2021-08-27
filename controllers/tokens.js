const { getNewAuth } = require('../utils/renewAuth');
exports.tokens = async (req, res) => {
  const { token } = req.loginUser;
  const newAuth = await getNewAuth(token.refreshToken);
  res.json({
    ok: true,
    loginUser: {
      token: {
        accessToken: newAuth.accessToken,
        refreshToken: token.refreshToken,
      },
    },
  });
};
