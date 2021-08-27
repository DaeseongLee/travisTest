const express = require('express');
const router = express.Router();
const {
  allCommunities,
  communityDetail,
  communityEnroll,
  communityDelete,
  dupCheckNickname,
} = require('../controllers/communities');

const { authenticateJWT } = require('../middlewares/authenticateJWT');

// 커뮤니티 루틴 전부 가져오기
router.get('/', allCommunities);

// //커뮤니티 루틴 디테일 가져오기
router.get('/:routineId', communityDetail);

//커뮤니티 루틴 등록
router.post('/', authenticateJWT, communityEnroll);

// //커뮤니티 루틴 삭제하기
// //authenticateJWT
router.delete('/:routineId', authenticateJWT, communityDelete);

router.post('/dupCheck', authenticateJWT, dupCheckNickname);

// //커뮤니티 루틴에서 나의루틴으로 가져오기
// //authenticateJWT
// router.post('/:routineId', authenticateJWT, async (req, res) => {
//   try {
//     const userId = req.userInfo.id;
//     const { myExercise, routineName } = req.body;

//     if (myExercise) {
//       const routine = await Routine.create({
//         userId,
//         routineName,
//       });
//       for (let i = 0; i < myExercise.length; i++) {
//         const { exerciseName, set } = myExercise[i];
//         const routineExercise = await Routine_Exercise.create({
//           routineId: routine.id,
//           exerciseName,
//         });

//         for (let i = 0; i < set.length; i++) {
//           const inputSet = set[i];
//           await Set.create({
//             routineExerciseId: routineExercise.id,
//             weight: inputSet?.weight,
//             count: inputSet?.count,
//             time: inputSet?.time,
//             type: inputSet?.type,
//             setCount: inputSet?.setCount,
//             minutes: inputSet?.minutes,
//             seconds: inputSet?.seconds,
//             order: i + 1,
//           });
//         }
//       }
//       await Community.findByIdAndUpdate(req.params.routineId, {
//         $push: { import: { userId } },
//       });
//       res.status(200).send({ ok: true });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ errorMessage: error });
//   }
// });

module.exports = router;
