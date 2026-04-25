// write get request with query params
//...
import axios from 'axios';
axios.get('http://localhost:8000/sum?a=5&b=6').then(response => {
    console.log('GET:', response.data);
})
.catch(error => {
    console.error(error);
});

// write post request 
// ...
axios.post('http://localhost:8000/sum', {
    a: 5,
    b: 6
})
.then(res => console.log('POST:', res.data))
.catch(err => console.error(err));