const pool = require('../config/database');

const Pengurus = {
  async getAll() {
    const [rows] = await pool.query(
      'SELECT p.*, d.nama_divisi FROM pengurus p LEFT JOIN divisi d ON p.divisi_id = d.id ORDER BY p.created_at DESC'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      'SELECT p.*, d.nama_divisi FROM pengurus p LEFT JOIN divisi d ON p.divisi_id = d.id WHERE p.id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create(data) {
    const { nama, nama_panggilan, jabatan, foto, kutipan, instagram, linkedin, github, status, periode, divisi_id } = data;
    const [result] = await pool.query(
      'INSERT INTO pengurus (nama, nama_panggilan, jabatan, foto, kutipan, instagram, linkedin, github, status, periode, divisi_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nama, nama_panggilan, jabatan, foto, kutipan, instagram, linkedin, github, status || 'aktif', periode, divisi_id]
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
    const [result] = await pool.query(`UPDATE pengurus SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM pengurus WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Pengurus;
