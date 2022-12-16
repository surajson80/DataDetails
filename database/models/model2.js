// Table 2 Model


module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("Merchant_Payment", {
      payment:{
        type: Sequelize.INTEGER
      }
    },{
        timestamps: false
    }
    );
    return Transaction;
  };