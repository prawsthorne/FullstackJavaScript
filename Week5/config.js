const fs = require('fs');
const path = require('path');

const myArgs = process.argv.slice(2);
if(myArgs.length > 1) console.log('the myapp.args: ', myArgs);
//console.log(typeof myArgs)

fs.readFile(__dirname + '/config.json', 'utf-8', (error, data) => {
    if(error) throw error; 
//    console.log(typeof data);         
    let cfg = JSON.parse(data);
    console.log(cfg);
//    console.log(typeof cfg); 
//   cfg[0][myArgs[1]] = myArgs[2].toString();
 
for(let key of Object.keys(cfg)){
    console.log(key);
    if(key === myArgs[1]) {
        console.log('config testing...')
        cfg[key] = myArgs[2]
        console.log(myArgs[1]);
        console.log(cfg[key]);
    }
  } 
    //console.log(Object.keys(cfg));
    //update an existing attribute
    //cfg.main = 'test';
    //add a new attribute
    //cfg.database = "testdb";
    //console.log(cfg);

    data = JSON.stringify(cfg, null, 2);
    fs.writeFile(__dirname + '/config.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});

