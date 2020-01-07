const assert = require("assert");
const User = require("../src/user");

describe("Updating methods", () => {
  let joe;
  beforeEach(async () => {
    joe = await new User({ name: "Joe",postCount:0 });
    await joe.save();
  });

  const assertName = async operation => {
    await operation;
    const users = await User.find({});

    assert(users.length === 1); //there is only one user
    assert(users[0].name === "Alex"); //first user has name property Alex
  };

  it("instance type using set and save", async () => {
    //set doesn't update the DB it's done only in memory
    //best fro updating a couple of different properties in steps
    const alex = joe.set({ name: "Alex" });
    //after that MUST call save()
    await alex.save();
    //User.find({}) with empty object returns [] with every User
    const users = await User.find({});

    assert(users.length === 1); //there is only one user
    assert(users[0].name === "Alex"); //first user has name property Alex
  });

  //update is good for just one change
  it("A model instance update", async () => {
    await assertName(joe.updateOne({ name: "Alex" }));
  });

  it("A model Class update", async () => {
    const users = await User.updateOne({ name: "Joe" }, { name: "Alex" });
    await assertName(users);
  });
  it("A model Class update one record", async () => {
    const user = await User.findOneAndUpdate(
      { name: "Joe" },
      { name: "Alex" },
      { useFindAndModify: false }
    );
    await assertName(user);
  });
  it("A model Class find a record with an Id and update ", async () => {
    const user = await User.findByIdAndUpdate(
      joe._id,
      { name: "Alex" },
      { useFindAndModify: false }
    );
    await assertName(user);
  });
//update operators Mongo modifies the data , 
//we are NOT retrieving information and modifing on the server 
//https://docs.mongodb.com/manual/reference/operator/
  it("User can have their likes incremented by 1", async()=>{
      await User.update({name:'Joe'},{$inc:{likes:10}})
      const mongoUser=await User.findOne({name:'Joe'})
      assert(mongoUser.likes===10)
  })
});
