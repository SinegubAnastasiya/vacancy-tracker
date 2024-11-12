import { iResponse } from '../interfaces';
import { createResponseDB, getAllResponsesDB } from '../repository/response.repository';

async function createResponse(useremail: string, vacancyid: number): Promise<iResponse[]> {
    const data: iResponse[] = await createResponseDB(useremail, vacancyid);
    if (!data.length) throw new Error('The database does not created');
    return data;
}

async function getAllResponses(): Promise<iResponse[]> {
    const data: iResponse[] = await getAllResponsesDB();
    if(!data.length) throw new Error('Array is empty');
    return data;
}

export { createResponse, getAllResponses };