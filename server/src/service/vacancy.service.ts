import { createVacancyDB, getAllVacanciesDB } from '../repository/vacancy.repository';

async function createVacancy(title: string, description: string, logo) {
    const data = await createVacancyDB(title, description, logo);
    if (!data.length) throw new Error('The database does not created');
    return data;
}

async function getAllVacancies() {
    const data = await getAllVacanciesDB();
    if(!data.length) throw new Error('Array is empty');
    return data;
}

export { createVacancy, getAllVacancies };