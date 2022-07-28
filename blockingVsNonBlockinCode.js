const fs = require('fs');

// Sync Version

// Reading a file
const fileIn = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(fileIn);

// Writing a file
const fileOut = `This is a new file: ${fileIn} super created on ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', fileOut);
console.log('File successfully created!');

// Non-blocking i/o versio

fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
  fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data1) => {
    console.log(data1);
    fs.readFile('./txt/append.txt', 'utf-8', (err, data2) => {
      console.log(data2);
      fs.writeFile('./txt/idiology.txt', `${data1}\n ${data2}`, (err) => {
        console.log(err);
      });
    });
  });
});

console.log('I shall gonna find a job sunner!');
