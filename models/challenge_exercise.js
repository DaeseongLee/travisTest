const Sequelize = require('sequelize');

//user
module.exports = class Challenge_Exercise extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        exerciseName: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Challenge_Exercise',
        tableName: 'challenge_exercise',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Challenge_Exercise.hasMany(db.Challenge_Set, {
      foreignKey: 'challengeExerciseId',
      sourceKey: 'id',
    });
    db.Challenge_Exercise.belongsTo(db.Challenge, {
      foreignKey: 'challengeId',
      targetKey: 'id',
    });
  }
};
