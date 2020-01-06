const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length>2,
      message: "Name must be longer than 2 charachters"
    },
    required: [true, "Name is required"]
  },
  postCount: Number
});

//create collection 'user' and use UserSchema, User represents entire collection of Users
const User = mongoose.model("user", UserSchema);

module.exports = User;
