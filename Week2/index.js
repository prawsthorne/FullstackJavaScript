const path = require("path");
const fs = require("fs");
const process = require("process");

// the current directory
console.log("__dirname:\n", __dirname, "\n");
// the current working direcctory of the executing process
console.log("process.cwd():\n", process.cwd(), "\n");
// the path of the current directory
console.log("./\n", path.resolve("./"), "\n");
// the full filename and directory 
console.log("filename:\n", __filename, "\n");
// the file extension of the current file
console.log("extension:\n", path.extname(__filename), "\n");

// Printing current directory
console.log("current working directory: " + process.cwd());
try {      
  process.chdir('./pictures');
  console.log("working directory after " + "changing: " + process.cwd());
} catch (err) {
  console.error("error occured while " + "changing directory: " + err);
}
// add a new file to the new directory, open the file if it already exists
fs.writeFile('newfile.txt', 'Learn Node FS module', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });