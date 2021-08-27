const Sequelize = require('sequelize');

module.exports = class Community_Set extends Sequelize.Model {
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
        modelName: 'Community_Set',
        tableName: 'community_set',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Community_Set.belongsTo(db.Community_Exercise, {
      foreignKey: 'communityExerciseId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      as: 'set',
    });
  }
};
