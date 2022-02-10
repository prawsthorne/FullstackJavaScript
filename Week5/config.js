const fs = require('fs');
const path = require('path');

fs.readFile(__dirname + '/config.json', (error, data) => {
    if(error) throw error;  
//    console.log(data);            
//    console.log(JSON.parse(data));
    let cfg = JSON.parse(data);
    //update an existing attribute
    cfg.main = 'test';
    //add a new attribute
    cfg.database = "testdb";
    //console.log(cfg);

    data = JSON.stringify(cfg, null, 2);
    fs.writeFile(__dirname + '/config.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});

