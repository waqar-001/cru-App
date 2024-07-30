import pool from '../config/db.js';

export async function getAllRecords() {
  const query = 'SELECT * FROM records';
  const res = await pool.query(query);
  return res.rows;
}
