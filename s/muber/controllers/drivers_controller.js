const Driver = require("../models/driver");

//this is OBJECT not function
module.exports = {
  greeting: (req, res) => {
    res.send({ hi: "there" });
  },
  create: async (req, res) => {
    console.log(req.body);
    //props to create new driver
    const driversProps = req.body;
    const newDriver = await Driver.create(driversProps);
    res.send(newDriver);
  }
};
