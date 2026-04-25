import http from 'http';
//Щоб код міг брати змінну PORT з .env, потрібно підключити пакет dotenv
import dotenv from 'dotenv';

// Завантажуємо змінні оточення, а саме з файлу .env
dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    // Додайте сюди обробку
            const url = new URL(req.url, `http://localhost:${PORT}`);
    if(url.pathname === '/sum'){
    if (req.method === 'GET') {
const a = url.searchParams.get('a');
const b = url.searchParams.get('b');    
const result = Number(a) + Number(b);
return res.end(JSON.stringify({ result }));
}

    else if (req.method === 'POST') {
let body = '';
req.on('data', chunk => body += chunk);
req.on('end', () => {
    const data = JSON.parse(body);
   const result = data.a + data.b;
   return res.end(JSON.stringify({ result }));
}); 
   }
      else {
        res.statusCode = 405;
        return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
}
 else {
    res.statusCode = 404;
    return res.end(JSON.stringify({ error: 'Not Found' }));
}});
server.listen(PORT, () => {
 console.log(`server is running on ${PORT}`);
}); 
