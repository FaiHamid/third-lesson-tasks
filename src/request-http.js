import http from 'http';

const postData = JSON.stringify({ a: 10, b: 20 });

const options = {
    hostname: 'localhost',
    port: 5500, 
    path: '/sum',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', chunk => { body += chunk; });
    res.on('end', () => {
        console.log('Результат POST запиту:', JSON.parse(body));
    });
});

req.write(postData); 
req.end(); 