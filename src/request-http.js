// write get request with query params
//...

import http from 'http';

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;

function httpSumRequest(a,b) {

    const options = {
        hostname: 'localhost',
        port: PORT,
        path: `/sum?a=${a}&b=${b}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const sumRequest = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });
        res.on('end', () => {
            console.log(`GET response: ${body}`);
        });
    });

    return sumRequest;
}


function httpPostRequest(a,b) {

    const data = JSON.stringify({
        a: a,
        b: b
    });

    const options = {
        hostname: 'localhost',
        port: PORT,
        path: `/sum`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const request = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });
        res.on('end', () => {
            console.log(`POST response: ${body}`);
        });
    });
    
    request.write(data);

    return request;
}

httpSumRequest(5,6).end();
httpPostRequest(10,20).end();
