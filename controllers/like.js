const Like_User = require('../models/like_user');
const { Op } = require('sequelize');

exports.like = async (req, res) => {
  const userId = req.userInfo.id;
  const communityId = req.params.routineId;

  try {
    const likeUser = await Like_User.findOne({
      where: {
        [Op.and]: { userId, communityId },
      },
    });
    if (likeUser) {
      await Like_User.destroy({
        where: {
          [Op.and]: { userId, communityId },
        },
      });
    } else {
      await Like_User.create({
        userId,
        communityId,
      });
    }

    res.status(200).send({ message: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
