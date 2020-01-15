const mongoose = require("mongoose");

before(async () => {
  // No longer works in mongoose 5
  // mongoose.connect('mongodb://localhost:27017/test').connection.
  // on('error', handleErr).
  // model('Test', new Schema({ name: String }));
  try {
    await mongoose.connect("mongodb://localhost/muber_test", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.warn("Warning", error);
  }
});

beforeEach(async () => {
  const { drivers } = await mongoose.connection.collections;
  try {
    await drivers
      .drop()
      //without this the geo indexes will be deleted
      //createIndexes NOT working
      // .then(() => drivers.createIndexes({ 'geometry.coordinates': "2dsphere"} ));
      .then(() => drivers.ensureIndex({ "geometry.coordinates": "2dsphere" }));
  } catch (error) {
    //catch the first time
    // console.log(error);
  }
});
