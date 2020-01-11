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
//Mongoose middleware mongoose events and callback
BlogPostSchema.pre("remove", async function() {
 
  const Comment = mongoose.model("comment"); 
  //NOT ITERATING, using mongo query operator $in
  // console.log('this ',this)
  
  await Comment.deleteMany({ _id: { $in: this.comments } })
  
});
//'blogpost' is the name
const BlogPost = mongoose.model("blogpost", BlogPostSchema);

module.exports = BlogPost;
