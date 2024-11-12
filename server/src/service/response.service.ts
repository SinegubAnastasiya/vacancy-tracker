import { iResponse } from '../interfaces';
import { createResponseDB, getAllResponsesDB } from '../repository/response.repository';

async function createResponse(userEmail: string, vacancyId: number): Promise<iResponse[]> {
    const data: iResponse[] = await createResponseDB(userEmail, vacancyId);
    if (!data.length) throw new Error('The database does not created');
    return data;
}

async function getAllResponses(): Promise<iResponse[]> {
    const data: iResponse[] = await getAllResponsesDB();
    if(!data.length) throw new Error('Array is empty');
    return data;
}

export { createResponse, getAllResponses };