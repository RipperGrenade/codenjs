#!/bin/bash
#generate a 2048-bit RSA private key
openssl genrsa -out rsa2048-key.pem 2048
#create a Certificate Signing Request (CSR) file
openssl req -new -sha256 -key rsa2048-key.pem -out rsa2048-csr.pem
#Creating a self-signed certificate
openssl x509 -req -in rsa2048-csr.pem -signkey rsa2048-key.pem -out rsa2048-cert.pem

