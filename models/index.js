const Sequelize = require('sequelize');
const User = require('./user');
const Category = require('./category');
const Default_Exercise = require('./default_exercise');
const Routine = require('./routine');
const Routine_Exercise = require('./routine_exercise');
const Set = require('./set');
const User_Custom = require('./user_custom');
const Challenge = require('./challenge');
const Challenge_Exercise = require('./challenge_exercise');
const Challenge_Set = require('./challenge_set');
const Challenge_User = require('./challenge_user');
const Community = require('./community');
const Community_Exercise = require('./community_exercise');
const Community_Set = require('./community_set');
const Like_User = require('./like_user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Category = Category;
db.Default_Exercise = Default_Exercise;
db.Routine = Routine;
db.Routine_Exercise = Routine_Exercise;
db.Set = Set;
db.User_Custom = User_Custom;
db.Challenge = Challenge;
db.Challenge_Exercise = Challenge_Exercise;
db.Challenge_Set = Challenge_Set;
db.Challenge_User = Challenge_User;
db.Community = Community;
db.Community_Exercise = Community_Exercise;
db.Community_Set = Community_Set;
db.Like_User = Like_User;

User.init(sequelize);
Category.init(sequelize);
Default_Exercise.init(sequelize);
Routine.init(sequelize);
Routine_Exercise.init(sequelize);
Set.init(sequelize);
User_Custom.init(sequelize);
Challenge.init(sequelize);
Challenge_Exercise.init(sequelize);
Challenge_Set.init(sequelize);
Challenge_User.init(sequelize);
Community.init(sequelize);
Community_Exercise.init(sequelize);
Community_Set.init(sequelize);
Like_User.init(sequelize);

User.associate(db);
Category.associate(db);
Default_Exercise.associate(db);
Routine.associate(db);
Routine_Exercise.associate(db);
Set.associate(db);
User_Custom.associate(db);
Challenge.associate(db);
Challenge_Exercise.associate(db);
Challenge_Set.associate(db);
Challenge_User.associate(db);
Community.associate(db);
Community_Exercise.associate(db);
Community_Set.associate(db);
Like_User.associate(db);

module.exports = db;
