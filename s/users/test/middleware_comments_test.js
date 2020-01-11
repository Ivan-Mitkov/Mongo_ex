const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");
const Comment = require("../src/comment");

describe("Middleware Comments", () => {
    let joe, blogPost, comment;
    beforeEach(done => {
      joe = new User({ name: "Joe" });
      blogPost = new BlogPost({
        title: "JS is Great",
        content: "Yes it really is"
      });
      comment = new Comment({ content: "Congrats on great post" });
      comment2 = new Comment({ content: "Congrats on great post again" });
  
      //Only in Node.js
      //associate by pushing entire model
      //Mongoose will recognize that this is assciation and will use id
      joe.blogPosts.push(blogPost);
      blogPost.comments.push(comment);
      blogPost.comments.push(comment2);
      //Mongoose set user property to joe._id
      comment.user = joe;
  
      //in DB
      Promise.all([joe.save(), blogPost.save(), comment.save(),comment2.save()]).then(() =>
        done()
      );
  });

 

  it("blogpost remove comments associated with him", done => {
    //   console.log(this)
    blogPost
      .remove()
      .then(() => Comment.countDocuments())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
