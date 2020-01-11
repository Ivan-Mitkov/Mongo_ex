const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
  let joe, blogPost, blogPost2;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yes it really is"
    });
    blogPost2 = new BlogPost({
      title: "JS is Realy Great",
      content: "Yes it is really great"
    });

    //Only in Node.js
    //associate by pushing entire model
    //Mongoose will recognize that this is assciation and will use id
    joe.blogPosts.push(blogPost);
    joe.blogPosts.push(blogPost2);

    //in DB
    Promise.all([joe.save(), blogPost.save(), blogPost2.save()]).then(() =>
      done()
    );
  });

  it("blogpost has two entries", async () => {
    const newUser = await User.findOne({ name: "Joe" });
    // console.log(newUser);
    // console.log(newUser.blogPosts)

    const post2 = await BlogPost.find({ _id: newUser.blogPosts });

    // console.log("POST2: ", post2);
    assert(post2[1].title === "JS is Realy Great");
  });

  it("user remove blogposts associated with him", done => {
    joe
      .remove()
      .then(() => BlogPost.countDocuments())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
