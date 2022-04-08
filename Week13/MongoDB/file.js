var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb3");
  const fs = require('fs');
  let mockData = fs.readFileSync('mockaroo.json');  
  let mockaroo = JSON.parse(mockData);  

  console.log(mockaroo); 
  dbo.collection("mockaroo").insertMany(mockaroo, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});