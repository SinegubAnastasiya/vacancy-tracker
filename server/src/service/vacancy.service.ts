import { iVacancy } from '../interfaces';
import { createVacancyDB, getAllVacanciesDB, getLogoByIdDB } from '../repository/vacancy.repository';

async function createVacancy(title: string, description: string, logo: string): Promise<iVacancy[]> {
    const data: iVacancy[] = await createVacancyDB(title, description, logo);
    if (!data.length) throw new Error('The database does not created');
    return data;
}

async function getAllVacancies() {
    const data = await getAllVacanciesDB();
    if(!data.items.length) throw new Error('Array is empty');
    return data;
}

async function getLogoById(id) {
    const data = await getLogoByIdDB(id);
    if(!data.logo.length) throw new Error('Array is empty');
    return data;
}

export { createVacancy, getAllVacancies, getLogoById };