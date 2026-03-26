import http from 'http';
//Щоб код міг брати змінну PORT з .env, потрібно підключити пакет dotenv
import dotenv from 'dotenv';

// Завантажуємо змінні оточення, а саме з файлу .env
dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    if(req.method === 'GET' && url.pathname === '/sum') {
        const aRaw = Number(url.searchParams.get('a'))
        const bRaw = Number(url.searchParams.get('b'));

        if (aRaw === null || bRaw === null) {
            res.setHeader( 'Content-Type', 'application/json' );
            return res.end(JSON.stringify({ error: 'no query parameters' }));
        }

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
            let data;
            try {
                data = JSON.parse(body);
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'invalid json body' }));
            }


            const result = Number(data.a) + Number(data.b);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ result }));
        });
    }
    else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
