import express, { Request, Response } from 'express';
const route = express.Router();
import { buildResponse } from '../helper/buildResponse';
import { createResponse, getAllResponses } from '../service/response.service';

route.post('/', async (req: Request, res: Response) => {
    try {
        const { userEmail, vacancyId } = req.body;
        const data = await createResponse(userEmail, vacancyId);
        buildResponse(res, 200, data);
    } catch (error: any) {
        buildResponse(res, 404, error.message);
    }
})

route.get('/', async (req: Request, res: Response) => {
    try {
        const data = await getAllResponses();
        buildResponse(res, 200, data);
    } catch (error: any) {
        buildResponse(res, 404, error.message);
    }
})

export default route;