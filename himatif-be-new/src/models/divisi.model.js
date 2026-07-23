const pool = require('../config/database');

const Divisi = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM divisi ORDER BY created_at DESC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM divisi WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { nama_divisi, deskripsi } = data;
    const [result] = await pool.query(
      'INSERT INTO divisi (nama_divisi, deskripsi) VALUES (?, ?)',
      [nama_divisi, deskripsi]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) return false;

    values.push(id);
    const [result] = await pool.query(`UPDATE divisi SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM divisi WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Divisi;
