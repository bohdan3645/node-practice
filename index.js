const http = require('http');
const fs = require('fs');

const PORT = 8000;
const HOST = '127.0.0.1';

const productsPageEmpty = fs.readFileSync(`${__dirname}/templates/products.html`, 'utf-8');
const productsData = fs.readFileSync(`${__dirname}/content/products.json`, 'utf-8');
const productsDataJson = JSON.parse(productsData);

const productsTemp = productsDataJson.map(product => {
    return `<h2 style="color:${product.color}">${product.productName}<h2>`;
});

const productsPagePopulated = productsPageEmpty.replace(/{%PRODUCTS%}/g, productsTemp.join(''));

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/products') {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(productsPagePopulated);

    } else {
        res.end('Not Found');
    }
});

server.listen(PORT, HOST, () => console.log(`Server is listening on port ${PORT}`));