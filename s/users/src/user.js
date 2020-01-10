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
  likes: Number,
  //add ref to blog post
  blogPosts: [{ type: Schema.Types.ObjectId, ref: "blogpost" }]
});
//add virtual property to the schema
//need to use function keyword not =>
//when using get() if we are using joe.postCount we are running are function without using ()
UserSchema.virtual("postCount").get(function() {
  return this.posts.length;
});

//Mongoose middleware mongoose events and callback
UserSchema.pre("remove", async function() {
  //this===joe
  //avoiding cycles in loading by using mongoose models in the function
  const BlogPost = mongoose.model("blogpost"); 
  //NOT ITERATING using mongo query operator $in
  // console.log('this joe',this)
  
  await BlogPost.deleteOne({ _id: { $in: this.blogPosts } })
  // .then(() =>{ 
  //   console.log("this blog posts 2: ", this.blogPosts||null);

  //   return next()})
  // .catch(err=>{
  //   console.log(err)
  // })
  // //dealing with async behaviour by using next
  // return next()
});

//create collection 'user' and use UserSchema, User represents entire collection of Users
const User = mongoose.model("user", UserSchema);

module.exports = User;
