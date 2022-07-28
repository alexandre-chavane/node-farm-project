// Play a bit with file system
// const fs = require('fs');
// // In order to create a server
const fs = require('fs');
const http = require('http');

// helps from parsing vars in urls
const url = require('url');

// 3rd party
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
// import url from 'url';
// // FileSystem Stuff
// const testIn = fs.readFileSync('./text.txt','utf-8');

// console.log(testIn);

// // Non-blocking: Asynchronous way

// fs.readFile('./start.txt','utf-8', (err, data) => {
//     // The data is been read without blocking the code
//     console.log(data);
// });

// console.log('test 0');
// Call that depend on previous

/////////////////////////////////
// Server Stuffs

// Sinchrounous version
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// Convert it to an object
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) =>
  slugify(el.productName, {
    lower: true,
  })
);
console.log(slugs);

const server = http.createServer((req, res) => {
  // const pathname = req.url;
  // console.log(pathname);

  // gives me all the properties of url: query, pathname, auth, protocol, etc
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    // OVERVIEW
    case '/':
    case '/overview':
      res.writeHead(200, {
        'content-type': 'text/html',
      });

      const cardshtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardshtml);
      res.end(output);
      break;

    // PRODUCT
    case '/product':
      res.writeHead(200, {
        'content-type': 'text/html',
      });
      // console.log(query)
      const product = dataObj[query.id]; //assign product element in a current po
      const productHtml = replaceTemplate(tempProduct, product);

      res.end(productHtml);
      break;

    // API
    case '/api':
      fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
        console.log(dataObj);

        res.writeHead(200, {
          'content-type': 'application/json',
        });
        res.end(data);
      });
      break;
    default:
      res.writeHead(404, {
        'content-type': 'text/html',
      });
      res.end('<h1>Sorry! Page not found</h1>');
      break;
  }
});

server.listen(8000, '127.0.0.1', () => {
  // This gonna be running as soon as start listening
  console.log('listening to requests on port 8000');
});
