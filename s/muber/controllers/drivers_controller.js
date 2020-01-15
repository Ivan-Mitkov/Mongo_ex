const Driver = require("../models/driver");

//this is OBJECT not function
module.exports = {
  greeting: (req, res) => {
    res.send({ hi: "there" });
  },
  create: async (req, res, next) => {
    // console.log('req body: ',req.body);
    //props to create new driver
    const driversProps = req.body;
    try {
      const newDriver = await Driver.create(driversProps);
      res.send(newDriver);
    } catch (error) {
      //if there is error for example missing required fields
      // call next middleware error handling middleware in app.js
      next(error);
    }
  },
  edit: async (req, res, next) => {
    const props = req.body;
    const id = req.params.id;
    // console.log("edit props: ", props,id);
    try {
      const newDriver = await Driver.findByIdAndUpdate({ _id: id }, props, {
        new: true,
        useFindAndModify: false
      });
      //   console.log('new driver',newDriver)
      res.send(newDriver);
    } catch (error) {
      console.log("Catch:", error);
      //if there is error for example missing required fields
      // call next middleware error handling middleware in app.js
      next(error);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.id;
    // console.log("edit props: ", props,id);
    try {
      const newDriver = await Driver.findByIdAndDelete({ _id: id });
      // console.log('new driver',newDriver)
      res.status(204).send(newDriver);
    } catch (error) {
      console.log("Catch:", error);
      //if there is error for example missing required fields
      // call next middleware error handling middleware in app.js
      next(error);
    }
  },
  index: async (req, res, next) => {
    const { lng, lat } = req.query;
    const point = {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)]
    };
    try {
      const geoDriver = await Driver.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              //query strings a strings not numbers so this is not working
              // coordinates: [lng, lat]

              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            spherical: true,
            distanceField: "dist",
            maxDistance: 200000
          }
        }
      ]);

      res.send(geoDriver);
    } catch (error) {
      next();
    }
  }
};
