const Sequelize = require('sequelize');

module.exports = class Community_Exercise extends Sequelize.Model {
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
        modelName: 'Community_Exercise',
        tableName: 'community_exercise',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Community_Exercise.hasMany(db.Community_Set, {
      foreignKey: 'communityExerciseId',
      sourceKey: 'id',
      as: 'set',
    });
    db.Community_Exercise.belongsTo(db.Community, {
      foreignKey: 'communityId',
      targetKey: 'id',
      as: 'myExercise',
      onDelete: 'CASCADE',
    });
  }
};
