const Sequelize = require('sequelize');

module.exports = class Routine extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        routineName: {
          type: Sequelize.STRING,
        },
        isBookmarked: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        isCompleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        routineTime: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        rating: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Routine',
        tableName: 'routine',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Routine.hasMany(db.Routine_Exercise, {
      foreignKey: 'routineId',
      sourceKey: 'id',
      as: 'myExercise',
      onDelete: 'CASCADE',
    });
    db.Routine.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  }
};
