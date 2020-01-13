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
  //   console.log(
  //     "criteria: ",
  //     criteria
  //     // " sort: ",
  //     // sortProperty,
  //     // " offset: ",
  //     // offset,
  //     // " limit: ",
  //     // limit
  //   );

  //check if there is some value in criteria

  const exists = par => {
    return Object.keys(criteria).some(name => name === par);
  };

  //create search object
  const createSearchObject = () => {
    let valueFilter = {};
    const trimName = criteria.name.trim();
    if (exists("name") && trimName) {
      valueFilter.name = { $regex: trimName, $options: "i" };
    }

    if (exists("age")) {
      valueFilter.age = { $gte: criteria.age.min, $lte: criteria.age.max };
    }

    if (exists("yearsActive")) {
      valueFilter.yearsActive = {
        $gte: criteria.yearsActive.min,
        $lte: criteria.yearsActive.max
      };
    }
    return valueFilter;
  };

//   const searchQueryObject = createSearchObject();
    const searchQueryObject=buildQuery(criteria)

  const searched = Artist.find(searchQueryObject)
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  //two queries one for searched and one for document counts so Promise.all
  return Promise.all([searched, Artist.countDocuments()]).then(res => {
    // console.log("Searched: ", res[0], res[1], offset, limit);
    return { all: res[0], count: res[1], offset: offset, limit: limit };
  });
};


//authors solution

const buildQuery = criteria => {
  const query = {};
  if(criteria.name){
      //in TERMINAL creat index for text field name
      //cant use $text without create index
      //search ONLY entire word NOT part of the word
      //use upstar_music
      //db.artists.createIndex({name:"text"})
      query.$text={$search:criteria.name}

  }
  if (criteria.age) {
    query.age = { $gte: criteria.age.min, $lte: criteria.age.max };
  }
  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    };
  }
  return query;
};
