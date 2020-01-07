const mongoose = require("mongoose");
const PostSchema = require("./post");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: "Name must be longer than 2 charachters"
    },
    required: [true, "Name is required"]
  },
  //postCount will be Virtual type so it's not in the schema
  // postCount: Number,
  posts: [PostSchema],
  likes:Number
});
//add virtual property to the schema
//need to use function keyword not =>
//when using get() if we are using joe.postCount we are running are function without using ()
UserSchema.virtual("postCount").get(function() {
  return this.posts.length;
});

//create collection 'user' and use UserSchema, User represents entire collection of Users
const User = mongoose.model("user", UserSchema);

module.exports = User;
