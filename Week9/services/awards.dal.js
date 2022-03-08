const dal = require("./db");

//get all awards.
var getAwards = function() {
  return new Promise(function(resolve, reject) {
    const sql = "SELECT title, name FROM vw_film_awards";
    dal.query(sql, [], (err, result) => {
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
}