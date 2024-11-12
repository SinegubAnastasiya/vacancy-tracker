import pool from '../db';
import { iResponse } from '../interfaces';

async function createResponseDB(userEmail: string, vacancyId: number): Promise<iResponse[]> {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const sql: string = 'INSERT INTO responses (userEmail, vacancyId) VALUES ($1, $2) RETURNING *';
        const { rows } = await client.query(sql, [userEmail, vacancyId]);

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

async function getAllResponsesDB(): Promise<iResponse[]> {
    const client = await pool.connect();

    const sql: string = 'SELECT * from responses';
    const { rows } = await client.query(sql);
    client.release();
    return rows;
}

export { createResponseDB, getAllResponsesDB };