const grab = flag => {
    let indexAfterFlag = process.argv.indexOf(flag) + 1;
    return process.argv[indexAfterFlag];
};

console.log(process.argv);

const username = grab("--username");
const task = grab("--task");

console.log(`${username} ${task}`);