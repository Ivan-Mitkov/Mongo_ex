const DriversControllers = require("../controllers/drivers_controller.js");

module.exports = app => {
    //not calling immediately controller just passing reference
  app.get("/api", DriversControllers.greeting);
};
