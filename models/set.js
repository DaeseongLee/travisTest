const Sequelize = require('sequelize');

module.exports = class Set extends Sequelize.Model {
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
        modelName: 'Set',
        tableName: 'set',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Set.belongsTo(db.Routine_Exercise, {
      foreignKey: 'routineExerciseId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      as: 'set',
    });
  }
};
