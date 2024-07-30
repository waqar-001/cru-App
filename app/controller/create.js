import pool from '../config/db.js';

export async function createRecord(data) {
  const { name, description } = data;
  const query = 'INSERT INTO records (name, description) VALUES ($1, $2) RETURNING *';
  const values = [name, description];
  const res = await pool.query(query, values);
  return res.rows[0];
}
