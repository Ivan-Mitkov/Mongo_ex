const assert = require("assert");
const User = require("../src/user");

describe("Creating records", () => {
  it("saves a user", done => {
    //create new user
    const joe = new User({ name: "Joe" });

    //save user
    joe.save().then(() => {
      //when instance is created isNew is true, when it is saved it is NOT new
      //so to check if it's save !joe.isNew
      assert(!joe.isNew);
      //continue when it's done with the test
      done();
    });
  });
});
