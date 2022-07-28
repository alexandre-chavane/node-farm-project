const http = require('http');

// Creates a server
const server = http.createServer((req, res) => {
  res.end(`From the server: Server response!`);
});

// Server listener
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000 and ip localhost the incoming requests');
});
