const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the DB", () => {
  let joe, maria, alex, zax;
  //first insert record after it's done do the other tests
  beforeEach(done => {
    //_id is assigned here before saving to the DB
    alex = new User({ name: "Alex" });
    joe = new User({ name: "Joe" });
    maria = new User({ name: "Maria" });
    zax = new User({ name: "Zax" });
    Promise.all([joe.save(), maria.save(), alex.save(), zax.save()]).then(() =>
      done()
    );
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

  it("can skip and limit the result set", async () => {
    const users = await User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2);
    assert(users.length === 2);
    assert(users[0].name === "Joe");
    assert(users[1].name === "Maria");
  });
});
