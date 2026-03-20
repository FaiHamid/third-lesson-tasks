// write get request with query params
//...

import axios from 'axios';

axios.get('http://localhost:8080/sum?a=5&b=6')
    .then(res => {
        console.log('GET result:', res.data);
    })
    .catch(err => console.error(err));

axios.post('http://localhost:8080/sum', {
    a: 5,
    b: 6
})
    .then(res => {
        console.log('POST result:', res.data);
    })
    .catch(err => console.error(err));

