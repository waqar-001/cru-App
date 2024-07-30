import pool from '../config/db.js';

export async function updateRecord(id, data) {
  const { name, description } = data;
  const query = 'UPDATE records SET name = $1, description = $2 WHERE id = $3 RETURNING *';
  const values = [name, description, id];
  const res = await pool.query(query, values);
  return res.rows[0];
}
