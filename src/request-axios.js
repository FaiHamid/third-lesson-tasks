import axios from 'axios';
//Щоб код міг брати змінну PORT з .env, потрібно підключити пакет dotenv
import dotenv from 'dotenv';

// Завантажуємо змінні оточення, а саме з файлу .env
dotenv.config({ path: '../.env' }); // в app.js працює без шляху, чому?)

const PORT = process.env.PORT || 8000;

// write get request with query params
const getRequestSum = async (params) => {
    const { a, b } = params

    try {
        return await axios.get(`http://localhost:${PORT}/sum?a=${a}&b=${b}`)
    }
    catch (err) {
        console.log(err);
        return
    }
}

// write post request 
const postRequestSum = async (params) => {
    try {
        return await axios.post(`http://localhost:${PORT}/sum`, params)
    }
    catch (err) {
        console.log(err);
        return
    }
}

const params = {
    a: 5,
    b: 1
}

const getResult = await getRequestSum(params)
console.log('GET Response:', getResult.data);
const postResult = await postRequestSum(params)
console.log('POST Response:', postResult.data);
