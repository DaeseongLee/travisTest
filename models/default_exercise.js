const Sequelize = require('sequelize');

module.exports = class Default_Exercise extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        exerciseName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Default_Exercise',
        tableName: 'default_exercise',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Default_Exercise.belongsTo(db.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
      as: 'exerciseList',
    });
  }
};
