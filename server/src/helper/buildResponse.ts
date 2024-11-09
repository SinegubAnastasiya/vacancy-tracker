import { Response } from 'express';
type MessageType = string;

function buildResponse(res: Response, status: number, body: MessageType) {
    res.status(status).send(body);
}

export { buildResponse };