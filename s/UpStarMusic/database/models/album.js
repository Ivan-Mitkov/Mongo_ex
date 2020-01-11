// Todo: create Album Schema
// Todo: Create Artist Model
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const AlbumSchema=new Schema({
    title:String,
    date:Date,
    copiesSold:Number,
    numberTracks:Number,
    image:String,
    revenue:Number,
  
})

//it's subdocument so there is NO MODEL
module.exports=AlbumSchema;