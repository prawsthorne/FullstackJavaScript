const dal = require("./pdb");

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

var deleteLanguage = function(id) {
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM public.language WHERE language_id = $1;";
    dal.query(sql, [id], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var patchLanguage = function(id, name) {
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.language SET name=$2	WHERE language_id=$1;";
    dal.query(sql, [id, name], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var putLanguage = function(id, name) {
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.language SET name=$2	WHERE language_id=$1;";
    dal.query(sql, [id, name], (err, result) => {
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
  deleteLanguage,
  patchLanguage,
  putLanguage,
}