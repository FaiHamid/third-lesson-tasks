// write get request with query params
//...

// write post request 
// ...

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;

const sendRequest = async () => {
    try {
        const response = await axios.post(`http://localhost:${PORT}/sum`, {
            a: 50,
            b: 25
        });
        console.log('Axios Result:', response.data);
    } catch (error) {
        console.error(error.message);
    }
};

sendRequest();