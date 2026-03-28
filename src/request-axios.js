// write get request with query params
//...
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;

async function getSumRequest(a,b) {

    const url = `http://localhost:${PORT}/sum`;

    try {
        const response = await axios.get(url, {
            params: {
                a: a,
                b: b
            }
        });

        console.log('Axios response: ' + JSON.stringify(response.data));
    } catch (error) {
        console.log('Axios request error: ' + error);
    }
}

async function postSumRequest(a, b) {

    const url = `http://localhost:${PORT}/sum`;

    try {
        const response = await axios.post(url, {
            a: a,
            b: b
        });

        console.log('Axios response: ' + JSON.stringify(response.data));
    } catch (error) {
        console.log('Axios request error: ' + error);
    }
}

postSumRequest(10, 20);