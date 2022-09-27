const dal = require("./db");

//get all actress with awards.
var getBestActress = function() {
  return new Promise(function(resolve, reject) {
    // const sql = "SELECT act.first_name || ' ' || act.last_name AS actor, \
    // flm.title AS film \
    //    FROM actor act \
    //      JOIN actor_category acat ON act.actor_id = acat.actor_id \
    //      JOIN category cat ON cat.category_id = acat.category_id \
    //      JOIN film flm ON acat.film_id = flm.film_id;";

    const view = "SELECT first_name || ' ' || last_name AS actor, title AS film \
      FROM vw_best_actress";
    dal.query(view, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

module.exports = {
    getBestActress,
}