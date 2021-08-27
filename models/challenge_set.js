const Sequelize = require('sequelize');

//user
module.exports = class Challenge_Set extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        weight: {
          type: Sequelize.INTEGER,
        },
        count: {
          type: Sequelize.INTEGER,
        },
        setCount: {
          type: Sequelize.INTEGER,
        },
        minutes: {
          type: Sequelize.INTEGER,
        },
        seconds: {
          type: Sequelize.INTEGER,
        },
        type: {
          type: Sequelize.STRING,
        },
        order: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Challenge_Set',
        tableName: 'challenge_set',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Challenge_Set.belongsTo(db.Challenge_Exercise, {
      foreignKey: 'challengeExerciseId',
      targetKey: 'id',
    });
  }
};
