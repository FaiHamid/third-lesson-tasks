import http from 'http';
//Щоб код міг брати змінну PORT з .env, потрібно підключити пакет dotenv
import dotenv from 'dotenv';

// Завантажуємо змінні оточення, а саме з файлу .env
dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    // Додайте сюди обробку
    const [path, query] = req.url.split('?');

    if (req.method === 'GET' && path === '/sum') {
        if (!query) {
            res.writeHead(400);
            return res.end('Empty query');
        }
        //v1
        // const a = query.split('&')[0].split('=')[1]
        // const b = query.split('&')[1].split('=')[1]
        
        // v2
        let values = [];

        const queryArray = query.split('&');

        queryArray.forEach(pair => {
            const [key, value] = pair.split('=');
            values.push(value);
        });

        const result = values.reduce((acc, val) => {
            const num = Number(val);
            return acc + num;
        }, 0);

        res.writeHead(200);
        return res.end(JSON.stringify({ result }));
    }

    if (req.method === 'POST' && path === '/sum') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            if (!body) {
                res.writeHead(400);
                return res.end('Empty body');
            }

            try {
                const { a, b } = JSON.parse(body);

                const result = Number(a) + Number(b);

                res.writeHead(200);
                return res.end(JSON.stringify({ result }));
            } catch (e) {
                res.writeHead(400);
                return res.end('Invalid JSON');
            }
        });

        return;
    }


    res.end();
});

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
