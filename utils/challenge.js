const Challenge_Exercise = require('../models/challenge_exercise');
const Challenge_Set = require('../models/challenge_set');
const { sequelize } = require('../models');
exports.allSearch = async () => {
  const [result] = await sequelize.query(`SELECT A.id
                                ,A.challengeName
                                ,A.challengeIntroduce
                                ,A.progressStatus
                                ,A.challengeDateTime
                                ,A.communityNickname
                                ,B.exerciseName
                                ,IFNULL(C.userCount, 0) AS userCount
                            FROM node_health.challenge AS A
                            INNER JOIN (
                              SELECT  E.challengeId AS challengeId
                                ,group_concat(E.exerciseName) AS exerciseName
                              FROM node_health.challenge_exercise AS E
                            GROUP BY E.challengeId
                            ) AS B ON A.id = B.challengeId
                            LEFT OUTER JOIN (
                              SELECT  U.challengeID AS challengeId
                                    ,COUNT(U.userId) AS userCount
                                  FROM node_health.challenge_user AS U
                              GROUP BY U.challengeId
                            ) AS C ON A.id = C.challengeId;
                          `);
  return result;
};

exports.find = (where) => {
  return {
    attributes: {
      include: [
        [
          sequelize.literal(`(
                    SELECT COUNT(userId)
                      FROM challenge_user AS challengeUser
                     WHERE
                        challengeUser.challengeId = Challenge.id
                )`),
          'userCount',
        ],
      ],
    },
    order: [['challengeDateTime', 'ASC']],
    where,
    include: [
      {
        model: Challenge_Exercise,
        attributes: ['exerciseName'],
        order: [['id'], ['ASC']],
        include: [
          {
            model: Challenge_Set,
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
            order: [['order'], ['ASC']],
          },
        ],
      },
    ],
  };
};

exports.getDeadLineYn = async (challengeId) => {
  const [result, metadate] =
    await sequelize.query(`SELECT ( case when date_format(now(), '%Y%m%d%H%i')-C.challengeDateTime >= 0 then 'end' 
                                            ELSE 'start'
	                             END ) as status
                               from challenge as C where id = ${challengeId};`);
  return result[0]?.status;
};
