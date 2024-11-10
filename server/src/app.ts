import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import routeVacancy from './controller/vacancy.controller'
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: 'GET,POST,PUT,DELETE,PATCH',
        credentials: true,
    })
)

app.use(bodyParser.json());

app.use('/vacancy', routeVacancy);

app.use((er: any, _req: Request, res: Response, next: NextFunction) => {
    res.send(er.message);
    next();
})

export { app };