import http from 'http';
import dotenv from 'dotenv';
import url from 'url';

dotenv.config();
const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    // Якщо прийшов GET запит (дані в URL)
    if (pathName === '/sum' && req.method === 'GET') {
        const query = parsedUrl.query;
        const result = Number(query.a) + Number(query.b);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));
    } 
    // Якщо прийшов POST запит (дані в тілі)
    else if (pathName === '/sum' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const result = Number(data.a) + Number(data.b);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ result }));
        });
    } 
    else {
        res.writeHead(404,{'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: 'not found' }));
    }
});

server.listen(PORT, () => console.log(`Сервер працює на порту ${PORT}`));