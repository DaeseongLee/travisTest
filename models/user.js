const Sequelize = require('sequelize');

//user
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING,
        },
        nickname: {
          type: Sequelize.STRING,
        },
        img: {
          type: Sequelize.STRING,
        },
        age: {
          type: Sequelize.INTEGER,
        },
        provider: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        snsId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        stamp: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        refreshToken: {
          type: Sequelize.STRING,
        },
        communityNickname: {
          type: Sequelize.STRING,
        },
        finishTutorial: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'user',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.User_Custom, { foreignKey: 'userId', sourceKey: 'id' });
    db.User.hasMany(db.Routine, { foreignKey: 'userId', sourceKey: 'id' });
    db.User.hasMany(db.Challenge_User, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });

    db.User.hasMany(db.Community, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });

    db.User.hasMany(db.Like_User, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });
  }
};
