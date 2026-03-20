import http from 'http';

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/sum?a=5&b=6',
    method: 'GET',
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('get result -', data);
    });
});

req.end();

const postData = JSON.stringify({ a: 5, b: 6 });

const postOptions = {
    hostname: 'localhost',
    port: 8080,
    path: '/sum',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
    },
};

const postReq = http.request(postOptions, (res) => {
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('post result - ', data);
    });
});

postReq.write(postData);
postReq.end();