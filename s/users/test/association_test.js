const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../src/user");
const BlogPost = require("../src/blogPost.js");
const Comment = require("../src/comment");

describe("Associations", () => {
  let joe, blogPost, comment;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yes it really is"
    });
    comment = new Comment({ content: "Congrats on great post" });

    //Only in Node.js
    //associate by pushing entire model
    //Mongoose will recognize that this is assciation and will use id
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    //Mongoose set user property to joe._id
    comment.user = joe;

    //in DB
    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("saves relation between a user and a blogpost", async () => {
    const newUser = await User.findOne({ name: "Joe" }).populate("blogPosts");
    // console.log(newUser);
    assert(newUser.blogPosts[0].title === "JS is Great");
  });
  it.only("saves a full relations graph", async () => {
    const newUser = await User.findOne({ name: "Joe" }).populate({
      path: "blogPosts",
      //this time populate is inside of the path
      populate: {
        path: "comments",
        //which model we want to use
        model: "comment",
        //nested populate
        populate: {
          path: "user",
          model: "user"
        }
      }
    });
    // console.log(newUser);
    // console.log(newUser.blogPosts[0]);
    // console.log(newUser.blogPosts[0].comments[0].user.name);
    assert(newUser.name === "Joe");
    assert(newUser.blogPosts[0].title === "JS is Great");
    assert(
      newUser.blogPosts[0].comments[0].content === "Congrats on great post"
    );
    assert(newUser.blogPosts[0].comments[0].user.name === "Joe");
  });
});
