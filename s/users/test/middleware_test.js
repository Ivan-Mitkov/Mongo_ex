const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
  let joe, blogPost;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yes it really is"
    });

    //Only in Node.js
    //associate by pushing entire model
    //Mongoose will recognize that this is assciation and will use id
    joe.blogPosts.push(blogPost);

    //in DB
    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it("user remove blogposts associated with him", async () => {
    await joe.remove();
    const count = await BlogPost.countDocuments();
    console.log(count)
    assert(count === 0);
  });
});
