import { createResponseDB, getAllResponsesDB } from '../repository/response.repository';

async function createResponse(userEmail, vacancyId) {
    const data = await createResponseDB(userEmail, vacancyId);
    if (!data.length) throw new Error('The database does not created');
    return data;
}

async function getAllResponses() {
    const data = await getAllResponsesDB();
    if(!data.length) throw new Error('Array is empty');
    return data;
}

export { createResponse, getAllResponses };