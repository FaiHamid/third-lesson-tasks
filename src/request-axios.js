import axios from 'axios';
//Щоб код міг брати змінну PORT з .env, потрібно підключити пакет dotenv
import dotenv from 'dotenv';

// Завантажуємо змінні оточення, а саме з файлу .env
dotenv.config({ path: '../.env' }); // в app.js працює без шляху, чому?)

const PORT = process.env.PORT || 8000;

const BASE_URL = `http://localhost:${PORT}/sum`;
// write get request with query params
const getRequestSum = async (params) => {
    try {
        return await axios.get(BASE_URL, { params })
    }
    catch (err) {
        return err.response || { data: { error: 'Server is down' } };
        return
    }
}

// write post request 
const postRequestSum = async (params) => {
    try {

        return await axios.post(BASE_URL, params)
    }
    catch (err) {
        return err.response || { data: { error: 'Server is down' } };

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
