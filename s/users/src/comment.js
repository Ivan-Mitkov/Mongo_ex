const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
 
  content: String,
  //passing reference to another model
  //ref is that mongo know where to look
  // must match the model definition name
  //name can be what we wanted user, author
  user: { type: Schema.Types.ObjectId, ref: "user" }
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
