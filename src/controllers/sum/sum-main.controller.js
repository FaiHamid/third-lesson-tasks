import {getSumController} from './get-sum.controller.js'
import {postSumController} from "./post-sum.controller.js";

export const sumMainController = (req, res) => {
    if(req.method === 'GET') {
        getSumController(req, res)
    }
    if(req.method === 'POST') {
        postSumController(req, res)
    }
};