import http from 'http';
import dotenv from  'dotenv';
import { sumMainController } from './controllers/sum/sum-main.controller.js';
import {getSum, postSum} from './request-axios.js';
import { getSumRequest, postSumRequest } from './request-http.js';


dotenv.config();

const server = http.createServer((req, res) => {
    if(req.url.startsWith('/sum')) {
        sumMainController(req, res);
    }
});

const PORT = process.env.PORT;

server.listen(PORT || 3000, () => {
    console.log(`Server started at port ${PORT}`);
    postSum(10, 15)
})