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
        try {
            console.log('Результат POST запиту:', JSON.parse(body));
        } catch (e) {
            console.error('Помилка при парсингу відповіді від сервера:', e.message);
        }
    });
});
req.on('error', (err) => {
    console.error('Помилка запиту:', err.message);
});

req.write(postData); 
req.end();