import { createVacancyDB } from '../repository/vacancy.repository';

async function createVacancy(title: string, description: string, logo) {
    const data = await createVacancyDB(title, description, logo);
    if (!data.length) throw new Error('The database does not created');
    return data;
}

export { createVacancy };