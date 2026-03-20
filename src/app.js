import http from 'http';
//Щоб код міг брати змінну PORT з .env, потрібно підключити пакет dotenv
import dotenv from 'dotenv';

// Завантажуємо змінні оточення, а саме з файлу .env
dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    if(req.method === 'GET' && url.pathname === '/sum') {
        const a = Number(url.searchParams.get('a'))
        const b = Number(url.searchParams.get('b'));

        const result =  a+b;

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ result }));
    }
    else if (req.method === 'POST' && url.pathname === '/sum') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const data = JSON.parse(body);

            const result = Number(data.a) + Number(data.b);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ result }));
        });
    }
    else {
        res.statusCode = 404;
        res.end();
    }

    // Додайте сюди обробку
    res.end();
});

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
