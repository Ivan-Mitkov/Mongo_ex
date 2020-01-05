const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the DB", () => {
  let joe;
  //first insert record after it's done do the other tests
  beforeEach(done => {
    //_id is assigned here before saving to the DB
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });
  it("Finds all users with the name of Joe", done => {
    User.find({ name: "Joe" }).then(users => {
      //   console.log(users);
      //first will fail _id is not a string it's a ObjectId
      // to compare need to use toString()
      // assert(users[0]._id===joe._id)
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });
  it("Finds a user with particular id", done => {
    User.findOne({ _id: joe._id }).then(user => {
      //   console.log(users);
      //first will fail _id is not a string it's a ObjectId
      // to compare need to use toString()
      // assert(users[0]._id===joe._id)
      assert(user._id.toString() === joe._id.toString());
      done();
    });
  });
});
