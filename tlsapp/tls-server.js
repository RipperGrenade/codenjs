const tls = require('tls');
const fs = require('fs');

const hostname = 'localhost';
const port = 9443;

const options = {
    key: fs.readFileSync('servercert/rsa2048-key.pem'),
    cert: fs.readFileSync('servercert/rsa2048-cert.pem'),

    // This is necessary only if using the client certificate authentication.
    requestCert: true,

    // This is necessary only if the client uses the self-signed certificate.
    ca: [fs.readFileSync('clientcert/rsa2048-cert.pem')]
};

const server = tls.createServer(options, (socket) => {
    console.log(`tls socket addr:${JSON.stringify(socket.address())}`);
    console.log(`peer cert:${JSON.stringify(socket.getPeerCertificate(false))}
    \nproto:${socket.getProtocol()}`);

    console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized');
    socket.write('welcome!', 'utf8', () => {
        console.log('tls msg sent');
    });
    socket.pipe(socket);
});


server.listen(port, hostname, () => {
    console.log(`TLS Server running at http://${hostname}:${port}/`);

});