import http from 'http';
//Щоб код міг брати змінну PORT з .env, потрібно підключити пакет dotenv
import dotenv from 'dotenv';
import { requestHttpListener } from './handler.js';

// Завантажуємо змінні оточення, а саме з файлу .env
dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(requestHttpListener);

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
