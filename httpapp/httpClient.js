const http = require('http');
const querystring = require('querystring');

const hostname = 'localhost';
const port = 3000;
const postData = querystring.stringify({
    'msg': 'Hello World!'
});

options = {
    host: hostname,
    port: port,
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    },
};

req = http.request(options, (res) => {
    console.log(`res headers:${JSON.stringify(res.headers)}\nstatusCode:${res.statusCode}`);
    res.on('data', (chunk) => {
        console.log(`response data:${chunk}`);
    });
    res.on('end', () => {
        console.log('There will be no more data from server.');
    });
});
console.log('ready to send...');

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(postData);

req.end(() => {
    console.log('finish request http');
});
