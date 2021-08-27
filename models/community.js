const Sequelize = require('sequelize');

module.exports = class Community extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        routineName: {
          type: Sequelize.STRING,
        },
        routineTime: {
          type: Sequelize.INTEGER,
        },

        description: {
          type: Sequelize.STRING,
        },
        communityNickname: {
          type: Sequelize.STRING,
        },
        isBookmarked: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        like: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Community',
        tableName: 'community',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Community.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
    db.Community.hasMany(db.Community_Exercise, {
      foreignKey: 'communityId',
      sourceKey: 'id',
      as: 'myExercise',
    });

    db.Community.hasMany(db.Like_User, {
      foreignKey: 'communityId',
      sourceKey: 'id',
    });
  }
};
