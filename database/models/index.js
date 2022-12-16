const dbConfig = require("../config/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// to call the model and store into the variable
db.transaction = require("./model.js")(sequelize, Sequelize);
db.transaction2 = require("./model2.js")(sequelize, Sequelize);
db.transaction3 = require("./model3.js")(sequelize, Sequelize);

// stablish the connection between two table and set the foreign key to tables 
db.transaction.hasMany(db.transaction2,{
   foreignKey: "merchant_id"
});
db.transaction2.hasMany(db.transaction,{
  foreignKey: "id"
});
db.transaction.hasMany(db.transaction3,{
  foreignKey: "merchant_id"
});
db.transaction3.hasMany(db.transaction,{
  foreignKey: "id"
});

module.exports = db;