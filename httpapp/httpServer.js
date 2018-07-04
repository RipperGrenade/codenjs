const http = require('http')

const hostname = 'localhost';
const port = 3000;

options = {
    host: hostname,
    port: port,
};
const httpserver = http.createServer(options, (req, res) => {
    console.log(`request headers: ${JSON.stringify(req.headers)}`);
    res.statusCode = 200;
    res.setHeader('content-type', 'text/plain');
    res.write('**http data writen**', 'utf8', () => {
        console.log('msg sent');
    });
    res.end();

});

console.log('ready to serve...');
httpserver.listen(options, () => {
    console.log(`HTTP-Server running at http://${hostname}:${port}/`);
});
