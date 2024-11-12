import pool from '../db';

async function createVacancyDB(title: string, description: string, logo) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const sql: string = 'INSERT INTO vacancies (title, description, logo) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await client.query(sql, [title, description, logo]);

        await client.query('COMMIT');

        return rows;
    } catch (error: any) {
        await client.query('ROLLBACK');
        console.log(error.message);

        return [];
    } finally {
        client.release();
    }
}

async function getAllVacanciesDB() {
    const client = await pool.connect();
    const vacanciesCount = 'SELECT COUNT(*) from vacancies'
    const vacancyResp = `SELECT v.id, v.title, v.description, COUNT(r.vacancyId) AS responses
        FROM vacancies v LEFT JOIN responses r ON v.id = r.vacancyId
        GROUP BY v.id
        ORDER BY v.id;`
    const { rows: totalResp } = await client.query(vacanciesCount);
    const { rows:  items} = await client.query(vacancyResp);
    const total = totalResp[0].count;
    
    client.release();
    return {
        items,
        total
    };
}

async function getLogoByIdDB(id) {
    const client = await pool.connect();

    const sql = 'SELECT logo from vacancies WHERE id = $1'
    const { rows: image } = await client.query(sql, [id]);
    const logo = image[0]
    
    client.release();
    return logo
}

export { createVacancyDB, getAllVacanciesDB, getLogoByIdDB };