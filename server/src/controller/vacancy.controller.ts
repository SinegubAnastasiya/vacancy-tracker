import express, { Request, Response } from 'express';
const route = express.Router();
import { buildResponse } from '../helper/buildResponse';
import { createVacancy } from '../service/vacancy.service';

route.post('/', async (req: Request, res: Response) => {
    try {
        const { title, description, logo } = req.body;
        const data = await createVacancy(title, description, logo);
        buildResponse(res, 200, data);
    } catch (error: any) {
        buildResponse(res, 404, error.message);
    }
})

export default route;