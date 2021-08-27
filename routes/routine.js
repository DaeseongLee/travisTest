const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../middlewares/authenticateJWT');

const {
  allRoutine,
  routineDetail,
  routineEnroll,
  routineBookmark,
  routineRecord,
  routineUpdate,
  routineDelete,
} = require('../controllers/routines');

/**
 *  @swagger
 *    $ref: 'swagger/routineAPI.yml'
 */

//Routine 가져오기
router.get('/', authenticateJWT, allRoutine);

//Routine 상세 가져오기
router.get('/:id', authenticateJWT, routineDetail);

//Routine 등록
router.post('/', authenticateJWT, routineEnroll);

//Routine 북마크 수정
router.patch('/bookmark', authenticateJWT, routineBookmark);

//운동기록 저장
router.patch('/result', authenticateJWT, routineRecord);

//루틴수정
router.put('/:routineId', authenticateJWT, routineUpdate);

router.delete('/:routineId', authenticateJWT, routineDelete);
module.exports = router;
