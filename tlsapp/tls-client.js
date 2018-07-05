const tls = require('tls');
const fs = require('fs');

const port = 10443;
const hostname = 'localhost';

const options = {
    host: hostname,
    port: port,

    // Necessary only if using the client certificate authentication
    key: fs.readFileSync('clientcert/nodejs-tls-client-key.pem'),
    cert: fs.readFileSync('clientcert/nodejs-tls-client-cert.pem'),


    requestCert: true,
    // Necessary only if the server uses the self-signed certificate
    // ca: [fs.readFileSync('clientcert/servercert_toconnect/nodejs-tls-server-cert.pem')],
    ca: [fs.readFileSync('clientcert/servercert_toconnect/python-tls-server-cert.pem')]
};


const socket = tls.connect(options, () => {
    const authd = socket.authorized;
    if (authd === false) {
        console.log(`failed connect:${socket.authorizationError}`);
    }
    else {
        console.log('client connected authorized');
    }

});

socket.on('readable', () => {
    let chunk;
    while (null !== (chunk = socket.read())) {
        console.log(`Received ${chunk.length} bytes of data:**${chunk}**`);
    }
    socket.end();

});

socket.on('end', () => {
    console.log("End connection");
});
