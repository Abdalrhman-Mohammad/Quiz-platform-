const http = require('http');
const app = require('./app');

const dotenv = require('dotenv');

dotenv.config({path: '.env'});

const PORT = process.env.PORT || 3000;

console.log(PORT);
const server = http.createServer(app);

server.listen(PORT);