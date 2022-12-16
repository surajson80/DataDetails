// Table 1 Model

module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("Merchant_Data", {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      eligible:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },{
        timestamps: false
    }
    );
    return Transaction;
  };