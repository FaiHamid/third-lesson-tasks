import http from 'http';
import dotenv from "dotenv";

dotenv.config();

export const getSumRequest = (a, b)  => {
    const options = {
        hostname: 'localhost',
        port: process.env.PORT,
        path: `/sum?a=${a}&b=${b}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => console.log(JSON.parse(body)));
    });

    req.on('error', (e) => console.error(e));
    req.write(JSON.stringify({ key: 'value' }));
    req.end();
}


export const postSumRequest = (a, b)  => {
    const data = JSON.stringify({ a: a, b: b });
    const options = {
        hostname: 'localhost',
        port: process.env.PORT,
        path: `/sum`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => console.log(JSON.parse(body)));
    });

    req.on('error', (e) => console.error(e));

    req.write(data);
    req.end();
}