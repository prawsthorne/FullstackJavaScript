var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb3");
  var myobj = {
    "userID": "2",
    "userData": {
        "firstName": "Firest",
        "lastName": "Lanaime",
        "number":{
            "phNumber": "9999999991",
            "cellNumber": "8888888888",
        },
        "address": {
            "Geo": {
                "latitude": 15.40,
                "longtitude": -70.90
            },
            "city": "surat",
            "state": "gujarat",
            "contry": "india"
        },
        "product": {
            "game": {
                "GTA": true,
                "DOTA": true
            },
            "television": {
                "TV": true,
                "PlayStation": true,
                "Xbox": false
            }
        },
    },
    "key": "ANbcsgYSIDncsSK"
};
  dbo.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});