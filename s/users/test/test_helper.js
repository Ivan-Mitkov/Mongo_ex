const mongoose = require("mongoose");

//connct to mongo one time
before(done => {
  //options are in order to use new version of Mongo and not print warnings
  mongoose.connect("mongodb://localhost/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection
    .once("open", () => {
      console.log("Good to go");
      done();
    })
    .on("error", err => console.warn("Error ", err));
});

//done - when function is completed execute done
//can't make it run with async await
beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections;

  users.drop(() => {
    //ready to run next test
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
