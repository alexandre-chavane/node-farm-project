const http = require('http');
const url = require('url');
const fs = require('fs');

// Reads api data: Only once
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const product = JSON.parse(data); // Converted to JS obj

// Creates a server
const server = http.createServer((req, res) => {
  const pathname = req.url;
  if (pathname === '/overview' || pathname === '/') {
    res.end('Overview Page');

    // Send back API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);
  } else if (pathname === '/product') {
    res.end('Product Page!');
  } else {
    // Informe browser about content to expect
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Hello-World!',
    });
    res.end('<h1> Page NOT Found! </h1>');
  }
});

// Server listener
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000 and ip localhost the incoming requests');
});
