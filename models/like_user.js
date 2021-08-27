const Sequelize = require('sequelize');

module.exports = class Like_User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        blank: {
          type: Sequelize.STRING,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Like_User',
        tableName: 'like_user',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Like_User.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
    db.Like_User.belongsTo(db.Community, {
      foreignKey: 'communityId',
      targetKey: 'id',
    });
  }
};
