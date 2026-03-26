import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

axios.get(`${BASE_URL}/sum`, {
    params: { a: 5, b: 6 }
})
    .then(res => {
        console.log('GET result:', res.data);
    })
    .catch(err => {
        console.error('GET error:', err.response?.data || err.message);
    });

axios.post(`${BASE_URL}/sum`, {
    a: 5,
    b: 6
})
    .then(res => {
        console.log('POST result:', res.data);
    })
    .catch(err => {
        console.error('POST error:', err.response?.data || err.message);
    });