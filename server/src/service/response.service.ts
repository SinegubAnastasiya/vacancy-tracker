import { iResponse } from '../interfaces';
import { createResponseDB, getAllResponsesDB } from '../repository/response.repository';

async function createResponse(useremail: string, vacancyid: number): Promise<iResponse[]> {
    if (!useremail || !vacancyid) throw new Error('Invalid input');
    const data: iResponse[] = await createResponseDB(useremail, vacancyid);
    if(!data.length) throw new Error('No data returned');
    return data;
}

async function getAllResponses(): Promise<iResponse[]> {
    const data: iResponse[] = await getAllResponsesDB();
    if(!data.length) throw new Error('Array is empty');
    return data;
}

export { createResponse, getAllResponses };