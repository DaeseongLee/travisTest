const express = require('express');
const router = express.Router();
const Community = require('../mongoose_models/community');
const { authenticateJWT } = require('../middlewares/authenticateJWT');

//댓글등록
// authenticateJWT
router.put('/:routineId', authenticateJWT, async (req, res) => {
  const { comment } = req.body;
  const userId = req.userInfo.id;
  const nickname = req.userInfo.nickname;

  try {
    if (!req.userInfo) {
      res.status(500).json({ errorMessage: '사용자가 아닙니다.' });
      return;
    }
    if (req.userInfo) {
      await Community.findByIdAndUpdate(req.params.routineId, {
        $push: { comment: { userId, comment, nickname } },
      });
      res.status(200).send({ message: 'success' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//댓글삭제
// authenticateJWT
router.delete('/:routineId', authenticateJWT, async (req, res) => {
  const { commentId } = req.body;
  const userId = req.userInfo.id;

  const routine = await Community.findById(req.params.routineId);
  const Comment = routine.comment.id(commentId);

  try {
    if (Comment.userId === userId) {
      await Community.findByIdAndUpdate(req.params.routineId, {
        $pull: { comment: { userId: userId } },
      });
      res.status(200).send({ message: 'success' });
    }
    if (!req.userInfo) {
      res.status(500).json({ errorMessage: '사용자가 아닙니다.' });
      return;
    }
    if (Comment.userId !== userId) {
      res.status(500).json({ errorMessage: '사용자가 일치하지 않습니다.' });
      return;
    }
    if (!Comment) {
      res.status(500).json({ errorMessage: '댓글이 존재하지 않습니다.' });
      return;
    }
    if (!routine) {
      res.status(500).json({ errorMessage: '게시글이 존재하지 않습니다.' });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
