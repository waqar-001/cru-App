import pool from '../config/db.js';

export async function deleteRecord(id) {
  const query = 'DELETE FROM records WHERE id = $1 RETURNING *';
  const values = [id];
  const res = await pool.query(query, values);
  return res.rows[0];
}
