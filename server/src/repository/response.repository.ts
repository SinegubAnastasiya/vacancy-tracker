import pool from '../db';

async function createResponseDB(userEmail: string, vacancyId: number) {
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

async function getAllResponsesDB() {
    const client = await pool.connect();

    const sql: string = 'SELECT * from responses';
    const { rows } = await client.query(sql);
    client.release();
    return rows;
}

export { createResponseDB, getAllResponsesDB };