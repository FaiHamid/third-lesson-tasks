import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = `http://localhost:${process.env.PORT}`;

export const getSum = async (a, b) => {
    const sum = await axios.get(`${baseUrl}/sum?a=${a}&b=${b}`);
    console.log(sum.data);
}

export const postSum = async (a, b) => {
    const sum = await axios.post(`${baseUrl}/sum`, { a, b });
    console.log(sum.data);
    return sum.data;
}