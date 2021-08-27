const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        categoryName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Category',
        tableName: 'category',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Category.hasMany(db.User_Custom, {
      foreignKey: 'categoryId',
      sourceKey: 'id',
    });
    db.Category.hasMany(db.Default_Exercise, {
      foreignKey: 'categoryId',
      sourceKey: 'id',
      as: 'exerciseList',
    });
  }
};
