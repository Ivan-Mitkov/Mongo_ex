const Artist = require("../models/artist");

/**
 * Finds a single artist in the artist collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the Artist that matches the id
 */
module.exports = _id => {
  return Artist.findOne({ _id: _id });
};

// Finds a single document by its _id field. findById(id)
// is almost* equivalent to findOne({ _id: id }). 
//If you want to query by a document's _id, use findById() instead of findOne().
// The id is cast based on the Schema before sending the command.
// This function triggers the following middleware.

// findOne()
// * Except for how it treats undefined. If you use findOne(),
// you'll see that findOne(undefined) and findOne({ _id: undefined }) 
//are equivalent to findOne({}) and return arbitrary documents. 
//However, mongoose translates findById(undefined) into findOne({ _id: null }).
