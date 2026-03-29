import http from 'http';
import dotenv from 'dotenv';
import url from 'url';

dotenv.config();
const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    if (pathName === '/sum' && req.method === 'GET') {
        const query = parsedUrl.query;
        const a = Number(query.a);
        const b = Number(query.b);

        if (isNaN(a) || isNaN(b)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Bad Request: a and b must be numbers' }));
        }

        const result = a + b;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));
    } 
    else if (pathName === '/sum' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            if (!body) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Bad Request: empty body' }));
            }

            try {
                const data = JSON.parse(body);
                const a = Number(data.a);
                const b = Number(data.b);

                if (isNaN(a) || isNaN(b)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Bad Request: a and b must be numbers' }));
                }

                const result = a + b;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ result }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    } 
    else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: 'not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`server is working on ${PORT}`);
});