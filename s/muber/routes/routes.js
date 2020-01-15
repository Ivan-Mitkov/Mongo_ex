const DriversControllers = require("../controllers/drivers_controller.js");

module.exports = app => {
  //not calling immediately controller just passing reference
  app.get("/api", DriversControllers.greeting);
  app.post("/api/drivers", DriversControllers.create);
  app.put("/api/drivers/:id", DriversControllers.edit);
  app.delete("/api/drivers/:id", DriversControllers.delete);
  app.get("/api/drivers", DriversControllers.index);
};
