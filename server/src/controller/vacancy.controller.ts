import express, { Request, Response } from 'express';
const route = express.Router();
import { buildResponse } from '../helper/buildResponse';
import { createVacancy, getAllVacancies, getLogoById } from '../service/vacancy.service';

route.post('/', async (req: Request, res: Response) => {
    try {
        const { title, description, logo } = req.body;
        const data = await createVacancy(title, description, logo);
        buildResponse(res, 200, data);
    } catch (error: any) {
        buildResponse(res, 404, error.message);
    }
})

route.get('/', async (req: Request, res: Response) => {
    try {
        const data: any = await getAllVacancies();
        buildResponse(res, 200, data);
    } catch (error: any) {
        buildResponse(res, 404, error.message);
    }
})

route.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data: any = await getLogoById(id);
        // res.set('Content-Type', 'image/jpeg')
        buildResponse(res, 200, data);
    } catch (error: any) {
        buildResponse(res, 404, error.message);
    }
})

export default route;