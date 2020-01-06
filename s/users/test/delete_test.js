const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;
  //first insert record after it's done do the other tests
  beforeEach(done => {
    //_id is assigned here before saving to the DB
    // Mongoose documents represent a one-to-one mapping to documents as stored in MongoDB. Each document is an instance of its Model.
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("model instance remove", done => {
    joe
      .remove()
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then(user => {
        assert(user === null);
      })
      .catch(err => {
        console.log(err);
      });
    done();
  });

  it("class method deleteOne", done => {
    User.deleteOne({ name: "Joe" })
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then(user => {
        assert(user === null);
      })
      .catch(err => {
        console.log(err);
      });
    done();
  });
  //   deprecated findOneAndRemove without { useFindAndModify: false }
  //   findOneAndRemove() becomes a MongoDB findAndModify() command,
  //as opposed to a findOneAndDelete() command
  it("class method findOneAndDelete", done => {
    User.findOneAndDelete({ name: "Joe" },{useFindAndModify:false})
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then(user => {
        assert(user === null);
      })
      .catch(err => {
        console.log(err);
      });
    done();
  });

  it("class method deleteMany", done => {
    User.deleteMany({ name: "Joe" })
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then(user => {
        assert(user === null);
      })
      .catch(err => {
        console.log(err);
      });
    done();
  });
});
