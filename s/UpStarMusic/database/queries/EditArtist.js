const Artist = require('../models/artist');

/**
 * Edits a single artist in the Artists collection
 * @param {string} _id - The ID of the artist to edit.
 * @param {object} artistProps - An object with a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves when the record is edited
 */
module.exports = (_id, artistProps) => {
    const artist=Artist.findOneAndUpdate({_id:_id},artistProps,{useFindAndModify:false})
    return artist;
};

// All top level update keys which are not atomic operation names are treated as set operations:

// Example:
// var query = { name: 'borne' };
// Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)

// // is sent as
// Model.findOneAndUpdate(query, { $set: { name: 'jason bourne' }}, options, callback)
// This helps prevent accidentally overwriting your document with { name: 'jason bourne' }
