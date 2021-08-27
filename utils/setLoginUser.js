exports.loginUser = (accessToken, refreshToken) => {
  return {
    //user,
    token: { accessToken, refreshToken },
  };
};
