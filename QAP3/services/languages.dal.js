const dal = require("./db");

var getLanguages = function() {
  return new Promise(function(resolve, reject) {
    const sql = "SELECT language_id, name FROM language";
    dal.query(sql, [], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var addLanguage = function(name) {
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.language(name) VALUES ($1);";
    dal.query(sql, [name], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

module.exports = {
  getLanguages,
  addLanguage,
}