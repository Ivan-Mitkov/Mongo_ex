const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", async () => {
    const joe = new User({ name: "Joe", posts: [{ title: "Post Title" }] });
    await joe.save();
    const joeWithPosts = await User.findOne({ name: "Joe" });
    assert(joeWithPosts.posts[0].title === "Post Title");
  });

  it("Can add subdocuments to an existing record", async () => {
    //create user
    const joe = new User({ name: "Joe", posts: [] });
    await joe.save();
    // fetch user from DB
    const joeWithPosts = await User.findOne({ name: "Joe" });
    //push into array of posts new post
    joeWithPosts.posts.push({ title: "New Post" });
    //save joe int DB 
    //We can save only Models not subdocuments, in order to save subdocuments must save the Model
    await joeWithPosts.save();
    //fetch this new user
    const newUser = await User.findOne({ name: "Joe" });
    assert(newUser.posts[0].title === "New Post");
  });
  it("Can remove existing subdocuments from record", async () => {
    //create user
    const joe = new User({ name: "Joe", posts: [{title:'New title'}] });
    await joe.save();
    // fetch user from DB
    const joeWithoutPosts = await User.findOne({ name: "Joe" });
    //using mongo api to remove the post NOT JS function
    joeWithoutPosts.posts[0].remove();
    //save joe int DB 
    //We can save only Models not subdocuments, in order to save subdocuments must save the Model
    await joeWithoutPosts.save();
    //fetch this new user
    const newUser = await User.findOne({ name: "Joe" });
    assert(newUser.posts.length===0);
  });
});
