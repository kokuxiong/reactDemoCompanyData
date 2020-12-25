const env = require('./env.js'); 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Empinfo = require('../models/empinfo.model.js')(sequelize, Sequelize);
db.Loginuser = require('../models/loginuser.model.js')(sequelize, Sequelize);
db.Sex = require('../models/sex.model.js')(sequelize, Sequelize);
db.Country = require('../models/country.model.js')(sequelize, Sequelize);
module.exports = db;