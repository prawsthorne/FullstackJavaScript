const dal = require("./db");

var getStores = function() {
    return new Promise(function(resolve, reject) {
      const sql = "SELECT * FROM vw_stores";
      dal.query(sql, [], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

var getStoreById = function(id) {
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM vw_stores WHERE store_id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var getLangRevenueByStoreId = function(id) {
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM vw_bestrentalsforlanguage WHERE store_id = $1 LIMIT 20";
    dal.query(sql, [id], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var getLangRevenueByStoreIdLanguage = function(id, name) {
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM vw_bestrentalsforlanguage \
      WHERE store_id = $1 AND name = $2 LIMIT 5";
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
  getStores,
  getStoreById,
  getLangRevenueByStoreId,
  getLangRevenueByStoreIdLanguage,
}