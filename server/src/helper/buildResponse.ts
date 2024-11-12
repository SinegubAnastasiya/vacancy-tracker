import { Response } from 'express';
import { iResponse, iVacancy } from '../interfaces';
type MessageType = string | iVacancy[] | iResponse[];

function buildResponse(res: Response, status: number, body: MessageType) {
    res.status(status).send(body);
}

export { buildResponse };