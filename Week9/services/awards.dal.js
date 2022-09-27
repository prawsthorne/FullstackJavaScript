const dal = require("./db");

//get all awards.
var getAwards = function() {
  return new Promise(function(resolve, reject) {
    const sql = "SELECT film_id, title, COUNT(film_id) AS count \
      FROM vw_film_awards GROUP BY title, film_id ORDER BY title";
    dal.query(sql, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

var getAwardsByFilmId = function(id) {
  return new Promise(function(resolve, reject) {
    var sql = "SELECT film_id, title, name, release_year, length, rating \
      FROM vw_film_awards WHERE film_id = $1";
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
  getAwards,
  getAwardsByFilmId,
}