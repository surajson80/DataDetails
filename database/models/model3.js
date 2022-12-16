// Table 3 Model


module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("Payouts", {
        merchant_id:{
            type: Sequelize.INTEGER
          },
        total_payment:{
        type: Sequelize.INTEGER
      }
    },
    );
    return Transaction;
  };