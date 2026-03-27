import http from 'http';
//Щоб код міг брати змінну PORT з .env, потрібно підключити пакет dotenv
import dotenv from 'dotenv';

// Завантажуємо змінні оточення, а саме з файлу .env
dotenv.config();

const PORT = process.env.PORT || 8000;
function checkForNull(res, a, b) {
    if (a == null || b == null) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: "Missing parameters",
            message: "Both 'a' and 'b' are required"
        }));
        return true
    }
    return false
}
function checkForNaN(res, a, b) {
    if (isNaN(a) || isNaN(b)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: "Wrong parameters",
            message: "Both 'a' and 'b' should be numbers"
        }));
        return true
    }
    return false
}

const server = http.createServer((req, res) => {
    // Додайте сюди обробку
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;

    if (req.method === 'GET' && path === '/sum') {
        const a = url.searchParams.get('a');
        const b = url.searchParams.get('b');

        if (checkForNull(res, a, b)) return;
        if (checkForNaN(res, a, b)) return;

        const result = Number(a) + Number(b);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ result }));
    }

    if (req.method === 'POST' && path === '/sum') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            if (!body) {
                res.writeHead(422, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                    error: "Empty body",
                }));
            }

            try {

                const { a, b } = JSON.parse(body);

                if (checkForNull(res, a, b)) return;
                if (checkForNaN(res, a, b)) return;

                const result = Number(a) + Number(b);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ result }));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                    error: "Invalid JSON",
                }));
            }
        });

        return;
    }
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
