const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  //passing reference to another model
  //ref is that mongo know where to look
  // must match the model definition name
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
});

//'blogpost' is the name
const BlogPost = mongoose.model("blogpost", BlogPostSchema);

module.exports = BlogPost;
