const Sequelize = require('sequelize');

const User = require('./user');
const Challenge = require('./challenge');

module.exports = class Challenge_User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // userId: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        //   // references: {
        //   //   model: User,
        //   //   key: 'id',
        //   // },
        // },
        // challengeId: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        //   // references: {
        //   //   model: Challenge,
        //   //   key: 'id',
        //   // },
        // },
        isCompleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        rating: {
          type: Sequelize.STRING,
        },
        challengeTime: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Challenge_User',
        tableName: 'challenge_user',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Challenge_User.belongsTo(db.User, {
      as: 'User',
      foreignKey: 'userId',
      targetKey: 'id',
    });
    db.Challenge_User.belongsTo(db.Challenge, {
      as: 'Challenge',
      foreignKey: 'challengeId',
      targetKey: 'id',
    });
  }
};
