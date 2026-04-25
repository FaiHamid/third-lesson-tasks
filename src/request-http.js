// write get request with query params
//...
import http from 'http';
const options = {
     hostname: 'localhost',
    port: 8000,
    path: '/sum?a=5&b=6',
    method: 'GET'
};
const req = http.request(options, (res) => {

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('GET:',data);
    });

});

req.end();
// write post request 
// ...
const postOptions = {
    hostname: 'localhost',
    port: 8000,
    path: '/sum',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const postReq = http.request(postOptions, (res) => {
    let data = '';

    res.on('data', chunk => data += chunk);

    res.on('end', () => {
        console.log('POST:', data);
    });
});

const body = JSON.stringify({ a: 5, b: 6 });

postReq.write(body);
postReq.end();