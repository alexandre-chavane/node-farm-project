// Core modules
const http = require('http');
const url = require('url');
const fs = require('fs');

// My own module
const replaceTemplate = require('./modules/replaceTemplate');

const temCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const temOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const temProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

// Reads api data: Only once
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data); // Converted to JS obj

// Creates a server
const server = http.createServer((req, res) => {
  // const pathname = req.url;

  // Parse URL
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    // API data 5 <> template-card 1
    const cardshtml = dataObj.map((el) => replaceTemplate(temCard, el)).join('');

    const product = temOverview.replace('{%PRODUCT_CARDS%}', cardshtml);
    // console.log(product);

    res.end(product);

    // API Page
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);

    // Product Page
  } else if (pathname === '/product') {
    // 1: Select one element
    const product = dataObj[query.id];

    // 2: replace the template
    const output = replaceTemplate(temProduct, product);

    // 3: retrieve the info
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end(output);

    // NOT Found Page
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
