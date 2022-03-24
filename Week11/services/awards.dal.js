const dal = require("./db");

var getAwardsByStoreId = function(id) {
    return new Promise(function(resolve, reject) {
      var sql = "SELECT film_id, title, release_year, rating, name, store_id \
        FROM vw_film_categories WHERE store_id = $1";
      dal.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };

  module.exports = {
    getAwardsByStoreId,
  }