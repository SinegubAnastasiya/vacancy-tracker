import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import routeVacancy from './controller/vacancy.controller'

const app = express();

app.use(bodyParser.json());

app.use('/vacancy', routeVacancy);

app.use((er: any, _req: Request, res: Response, next: NextFunction) => {
    res.send(er.message);
    next();
})

export { app };