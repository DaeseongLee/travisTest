const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Routine = require('../models/routine');
const Routine_Exercise = require('../models/routine_exercise');
const Set = require('../models/set');

//루틴 가져오기
const allRoutine = async (req, res) => {
  const userId = req.userId;
  const params = req.query;
  let where;
  if (params.sorting) {
    if (params.sorting === 'bookmark') {
      where = { isBookmarked: true };
    } else {
      where = Sequelize.literal(
        `Routine.createdAt > DATE_FORMAT(date_add(NOW(), INTERVAL - 1 ${params.sorting}), '%Y%m%d')`
      );
    }
  } else if (params.date) {
    where = Sequelize.literal(
      `DATE_FORMAT(Routine.createdAt, '%Y%m%d') = ${params.date}`
    );
  } else {
    where = {};
  }
  try {
    const routines = await Routine.findAll({
      where: {
        [Op.and]: [{ userId }, where],
      },
      attributes: [
        'id',
        'routineName',
        'isBookmarked',
        'isCompleted',
        'routineTime',
        'rating',
        'createdAt',
      ],
      include: [
        {
          model: Routine_Exercise,
          attributes: ['id', 'exerciseName'],
          as: 'myExercise',
          include: [
            {
              model: Set,
              as: 'set',
            },
          ],
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        ['myExercise', 'order', 'ASC'],
      ],
    });
    const result = [];
    if (routines.length > 0) result.push(routines[0]);
    res.json({ ok: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: error });
  }
};

//루틴 상세
const routineDetail = async (req, res) => {
  const userId = req.userId;
  const id = req.params;
  try {
    const result = await Routine.findAll({
      attributes: [
        'id',
        'routineName',
        'routineTime',
        'rating',
        'isBookmarked',
        'isCompleted',
        'createdAt',
      ],
      where: {
        [Op.and]: [{ userId }, id],
      },
      include: [
        {
          model: Routine_Exercise,
          attributes: ['id', 'exerciseName'],
          as: 'myExercise',
          include: [
            {
              model: Set,
              as: 'set',
              attributes: [
                'id',
                'setCount',
                'weight',
                'count',
                'minutes',
                'seconds',
                'type',
                'order',
              ],
            },
          ],
        },
      ],
      order: Sequelize.literal(
        'myExercise.order ASC, `myExercise->set`.order ASC'
      ),
    });
    res.json({ ok: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: error });
  }
};

//루틴 등록
const routineEnroll = async (req, res) => {
  try {
    const { myExercise, date } = req.body;
    const userId = req.userId;
    const routineName = `${myExercise[0]['exerciseName']} ${
      myExercise.length > 1 ? '외 ' + (myExercise.length - 1) + '개' : ''
    }`;

    if (myExercise) {
      const existRoutine = await Routine.findAll({
        attributes: ['id'],
        where: Sequelize.literal(
          `Routine.userId=${userId} and  DATE_FORMAT(Routine.createdAt, '%Y%m%d') = ${date}`
        ),
      });
      if (existRoutine.length > 0) {
        await Routine.destroy({
          where: Sequelize.literal(
            `userId=${userId} and  DATE_FORMAT(createdAt, '%Y%m%d') = ${date}`
          ),
        });
      }
      const routine = await Routine.create({
        userId,
        routineName,
      });
      for (let i = 0; i < myExercise.length; i++) {
        const { exerciseName, set } = myExercise[i];
        const routineExercise = await Routine_Exercise.create({
          routineId: routine.id,
          exerciseName,
          order: i + 1,
        });

        for (let j = 0; j < set.length; j++) {
          const inputSet = set[j];
          await Set.create({
            routineExerciseId: routineExercise.id,
            weight: inputSet?.weight,
            count: inputSet?.count,
            time: inputSet?.time,
            type: inputSet?.type,
            setCount: inputSet?.setCount,
            minutes: inputSet?.minutes,
            seconds: inputSet?.seconds,
            order: j + 1,
          });
        }
      }
    }
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: error });
  }
};

//루틴 북마크
const routineBookmark = async (req, res) => {
  const userId = req.userId;
  const { id, isBookmarked, routineName } = req.body;
  try {
    const routine = await Routine.findByPk(id);
    if (userId !== routine.userId) {
      return res.json({ ok: false, message: '수정할 권한이 없습니다' });
    }

    const result = await Routine.update(
      {
        isBookmarked,
        routineName,
      },
      {
        where: { id },
      }
    );
    console.log(result);
    res.json({ ok: true, routineId: id, routineName });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: error });
  }
};

//운동기록저장
const routineRecord = async (req, res) => {
  const userId = req.userId;
  const { id, routineTime, rating, isCompleted } = req.body;
  try {
    const routine = await Routine.findByPk(id);
    if (userId !== routine.userId) {
      return res.json({ ok: false, message: '권한이 없습니다' });
    }

    await Routine.update(
      {
        routineTime,
        rating,
        isCompleted,
      },
      {
        where: { id },
      }
    );
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: error });
  }
};

//루틴수정
const routineUpdate = async (req, res, next) => {
  const userId = req.userId;
  const routineId = req.params.routineId;
  const { myExercise } = req.body;

  try {
    const routineExercises = await Routine_Exercise.findAll({
      attributes: ['id'],
      where: { routineId },
    });
    const routineExerciseIds = routineExercises.map((exercise) => exercise.id);
    const myExerciseIds = myExercise.map((exercise) => exercise.id);

    let filterIds = routineExerciseIds.filter(function (id) {
      return !myExerciseIds.includes(id);
    });
    if (filterIds.length > 0) {
      for (let i = 0; i < filterIds.length; i++) {
        await Routine_Exercise.destroy({
          where: { id: filterIds[i] },
        });
      }
    }

    for (let i = 0; i < myExercise.length; i++) {
      const { set, id } = myExercise[i];
      await Routine_Exercise.update(
        {
          order: i + 1,
        },
        {
          where: { id },
        }
      );

      await Set.destroy({
        where: { routineExerciseId: id },
      });

      for (let j = 0; j < set.length; j++) {
        const inputSet = set[j];
        inputSet.routineExerciseId = id;
        inputSet.order = j + 1;
        await Set.create(inputSet);
      }
    }

    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//루틴 삭제
const routineDelete = async (req, res) => {
  const userId = req.userId;
  const { routineId } = req.params;

  try {
    const routine = await Routine.findOne({
      where: { id: routineId },
    });

    if (userId !== routine.userId) {
      return res.json({ ok: false, message: '권한이 없습니다' });
    }

    await Routine.destroy({
      where: { id: routineId },
    });
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: error });
  }
};

module.exports = {
  allRoutine,
  routineDetail,
  routineEnroll,
  routineBookmark,
  routineRecord,
  routineUpdate,
  routineDelete,
};
