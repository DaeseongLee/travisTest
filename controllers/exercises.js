const Category = require('../models/category');
const Default_Exercise = require('../models/default_exercise');
//전체조회
const allExercies = async (req, res) => {
  try {
    const result = await Default_Exercise.findAll({
      attributes: ['id', 'exerciseName'],
      order: [['createdAt', 'DESC']],
    });

    res.json({ ok: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: error });
  }
};

//카데고리별 조회
const exerciseForCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const result = await Category.findAll({
      attributes: ['id', 'categoryName'],
      where: {
        id: categoryId,
      },
      include: [
        {
          model: Default_Exercise,
          as: 'exerciseList',
        },
      ],
    });

    res.json({ ok: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: error });
  }
};

module.exports = {
  allExercies,
  exerciseForCategory,
};
