const Sequelize = require('sequelize');

//user
module.exports = class Challenge extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        challengeName: {
          type: Sequelize.STRING,
        },
        challengeIntroduce: {
          type: Sequelize.STRING,
        },
        progressStatus: {
          type: Sequelize.STRING,
          defaultValue: 'before',
        },
        challengeDateTime: {
          type: Sequelize.INTEGER,
        },
        communityNickname: {
          type: Sequelize.STRING,
        },
        runningTime: {
          type: Sequelize.INTEGER,
        },
        difficulty: {
          type: Sequelize.STRING,
        },
        remainTime: {
          type: Sequelize.STRING,
        },
        endDateTime: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Challenge',
        tableName: 'challenge',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Challenge.hasMany(db.Challenge_Exercise, {
      foreignKey: 'challengeId',
      sourceKey: 'id',
    });
    db.Challenge.hasMany(db.Challenge_User, {
      foreignKey: 'challengeId',
      sourceKey: 'id',
    });
  }
};
