const crc32 = require('crc/crc32');
const { format } = require('date-fns');

const fs = require('fs');
const path = require('path');

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

let username = 'mrthorne';
let crc = crc32(username).toString(16);
let now = new Date();
let expires = addDays(now, 3);

let newToken = JSON.parse(`{
    "created": "1969-01-31 12:30:00",
    "username": "username",
    "email": "user@example.com",
    "phone": "5556597890",
    "token": "token",
    "expires": "1969-02-03 12:30:00",
    "confirmed": "tbd"
}`);

newToken.created = `${format(now, 'yyyy-MM-dd HH:mm:ss')}`;
newToken.username = username;
newToken.token = crc;
newToken.expires = `${format(expires, 'yyyy-MM-dd HH:mm:ss')}`;

fs.readFile(__dirname + '/tokens.json', 'utf-8', (error, data) => {
    if(error) throw error; 
    let tokens = JSON.parse(data);
    console.log(Object.keys(tokens).length);
    tokens.push(newToken);
    //console.log(tokens);
    userTokens = JSON.stringify(tokens);
    //console.log(userTokens);

    fs.writeFile('tokens.json', userTokens, (err) => {
        if (err) console.log(err);
        else console.log(fs.readFileSync("tokens.json", "utf8"));
    })
});