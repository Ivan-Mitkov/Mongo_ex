const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = express();

if (process.env.NODE_ENV !== "test") {
    try {
        mongoose.connect("mongodb://localhost/muber", {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });  
    } catch (error) {
        console.warn('Connection', error)
    }
  
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);
//executing middleware for errors after routes
// Error-handling middleware always takes four arguments.
// You must provide four arguments to identify it as an error-handling middleware function.
// Even if you don’t need to use the next object, you must specify
// it to maintain the signature. Otherwise, the next object will be interpreted
// as regular middleware and will fail to handle errors.
app.use((err, req, res, next) => {
  //err only if previous middleware threw an error 
  // email: Path `email` is required.
//   console.log('Error Middleware ',err);
  res.status(422).send({error:err.message})
  
});
module.exports = app;
