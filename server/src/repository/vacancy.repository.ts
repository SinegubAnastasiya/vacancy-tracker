import { log } from 'console';
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

export { createVacancyDB };