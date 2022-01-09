// https://momentjs.com/
// https://zetcode.com/javascript/momentjs/

const moment = require('moment');

let now = moment();

console.log('moment.js');
console.log('Set the format yourself: ' + now.format('MMMM Do YYYY, h:mm:ss a'));

console.log();
console.log('Or use one of the built in formats');
console.log('format is ll: ' + now.format('ll'));
console.log('format is lll: ' + now.format('lll'));

console.log();
console.log('Or work with relative time');
console.log('how long ago did the day start? ' + now.startOf('day').fromNow());      
console.log('how long until the day ends? ' + now.endOf('day').fromNow()); 

console.log();
console.log('Or do some simple math upon a calendar');
console.log('subract a day: ' + now.subtract(1, 'days').calendar());  
console.log('what is now set to? ' + now.calendar());                      
console.log('add a day: ' + now.add(1, 'days').calendar());  

// JUNE 24, 1497 Italian explorer John Cabot claims the island of Newfoundland for England.
let JohnCabot = moment('1497-06-24');
let days = now.diff(JohnCabot, 'days');

console.log(`On ${now.format('ll')}, ${days} days have passed since John Cabot claimed the island of Newfoundland for England.`);