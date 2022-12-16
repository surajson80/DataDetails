const { transaction2 } = require("../models");
const db = require("../models");
// const {Sequelize} = require('sequelize')
const Transaction = db.transaction;
const DataOne = db.transaction2;
const Payout = db.transaction3;
const Op = db.Sequelize.Op;


// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Transaction
  const transaction = {
    id: req.body.id,
    merchent_id: req.body.merchent_id,
    payment: req.body.payment,
    // payment_hold: req.body.payment_hold,
    // status: req.body.status,
  };

  // Save Transaction in the database
  Transaction.create(transaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction."
      });
    });
};

// Retrieve all Transactions from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Transaction.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions."
      });
    });
};

// Find a single Transaction with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  Transaction.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Transaction with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Transaction with id=" + id
      });
    });
};


// stablish the connetion between table and fetch the data and store into the payout table
exports.oneToOne = async (req, res) => {
  let data1 = await Transaction.findAll({
    include: {
      model: DataOne,
    },
    where:{eligible: 1}

  }).then((data1) => {

    // loops to add the sum of payment for eligible merchants and for indivisual merchant_id also
      for (let i = 0; i < data1.length; i++) {
        let y = 0;
        // console.log(data1[i])
        // console.log(data1[i].dataValues.Merchant_Payments.merchent_id);
        for (let j = 0; j < data1[i].Merchant_Payments.length; j++) {
          y += Number(data1[i].Merchant_Payments[j].payment);
        }
        const payout={
          merchant_id: data1[i].id,
          total_payment: y
        };
        Payout.create(payout)
    }
  }).then((data) => {
    res.send({message:" done "});
  }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the payment.",
      });
    });  
  };
    