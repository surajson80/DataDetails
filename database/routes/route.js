module.exports = app => {
    const transactions = require("../controllers/controller");
    const transactions2 = require("../controllers/controller2");
    const transactions3 = require("../controllers/controller3")

  
    var router = require("express").Router();
  
    // Create a new Transaction
    router.post("/", transactions.create);
    router.post("/net", transactions2.create);
    router.post("/pay", transactions3.create);
  
    // Retrieve all Transactions
    router.get("/", transactions.findAll);
    router.get("/net", transactions2.findAll);
    router.get("/pay", transactions3.findAll);

    // Retrieve the sum of the payments
    router.get("/one",transactions.oneToOne) 
  
    // Retrieve a single Tutorial with id
    router.put("/:id", transactions.findOne);
    router.put("/:mid", transactions2.findOne);
    router.put("/:mmid", transactions2.findOne);


  // router.get("/raw-query", transactions.rawQuery)
    app.use('/gateway/web', router);
  };
  