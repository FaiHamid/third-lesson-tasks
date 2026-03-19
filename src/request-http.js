import http from 'http';
//Щоб код міг брати змінну PORT з .env, потрібно підключити пакет dotenv
import dotenv from 'dotenv';

// Завантажуємо змінні оточення, а саме з файлу .env
dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 8000;

// console.log(PORT);
// write get request with query params
const params = { a: 5, b: 6 }
const options = {
    hostname: 'localhost',
    port: PORT,
    path: `/sum?a=${params.a}&b=${params.b}`,
    method: 'GET'
};

const getReq = http.request(options, (res) => {
    let data = '';

    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => {
        console.log("GET response:", JSON.parse(data));
    });

})

getReq.on('error', console.error);
getReq.end()

// write post request 
const data = JSON.stringify(params);
// console.log(data);

const optionsPost = {
    hostname: 'localhost',
    port: PORT,
    path: `/sum`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};

const postReq = http.request(optionsPost, (res) => {
    let data = '';

    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => {
        console.log("POST response: ", JSON.parse(data));
    });

})

postReq.on('error', console.error);
postReq.write(data);
postReq.end();