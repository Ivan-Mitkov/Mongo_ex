const Artist = require("../models/artist");

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 10) => {
  console.log(
    "criteria: ",
    criteria,
    " sort: ",
    sortProperty,
    " offset: ",
    offset,
    " limit: ",
    limit
  );
  //check if there is some value in criteria
  const exists = Object.keys(criteria).some(k => {
    if (criteria[k]) {
      return true;
    } else {
      return false;
    }
  });

  const filter = exists ? criteria : {};
  //finish check

  const searched = Artist.find(filter)
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  //two queries one for searched and one for document counts so Promise.all
  return Promise.all([searched, Artist.countDocuments()]).then(res => {
    console.log("Searched: ", res[0], res[1], offset, limit);
    return { all: res[0], count: res[1], offset: offset, limit: limit };
  });
};
