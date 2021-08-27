const express = require('express');
const router = express.Router();
const {
  allExercies,
  exerciseForCategory,
} = require('../controllers/exercises');

const { authenticateJWT } = require('../middlewares/authenticateJWT');
/**
 *  @swagger
 *    $ref: 'swagger/exerciseAPI.yml'
 */

//전체 조회
router.get('/', authenticateJWT, allExercies);

//카테고리 별 조회
router.get('/:categoryId', authenticateJWT, exerciseForCategory);

module.exports = router;
