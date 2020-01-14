const Driver = require("../models/driver");

//this is OBJECT not function
module.exports = {
  greeting: (req, res) => {
    res.send({ hi: "there" });
  },
  create: async (req, res,next) => {
    console.log('req body: ',req.body);
    //props to create new driver
    const driversProps = req.body;
    try {
        const newDriver = await Driver.create(driversProps);
        res.send(newDriver);
    } catch (error) {
        //if there is error for example missing required fields
        // call next middleware error handling middleware in app.js
        next(error)
    }
   
  }
};
