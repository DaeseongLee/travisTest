const Sequelize = require('sequelize');

module.exports = class User_Custom extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // userId: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        //   references: {
        //     model: User,
        //     key: 'id',
        //   },
        // },
        // categoryId: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        //   references: {
        //     model: Category,
        //     key: 'id',
        //   },
        // },
        customName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User_Custom',
        tableName: 'user_custom',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.User_Custom.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
    db.User_Custom.belongsTo(db.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
    });
  }
};
