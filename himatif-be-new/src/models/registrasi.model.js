const pool = require('../config/database');

const Registrasi = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM registrasi_anggota ORDER BY created_at DESC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM registrasi_anggota WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { nama_lengkap, nim, angkatan, kelas, email, no_whatsapp, alasan_bergabung, status } = data;
    const [result] = await pool.query(
      'INSERT INTO registrasi_anggota (nama_lengkap, nim, angkatan, kelas, email, no_whatsapp, alasan_bergabung, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nama_lengkap, nim, angkatan, kelas, email, no_whatsapp, alasan_bergabung, status || 'pending']
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
    const [result] = await pool.query(`UPDATE registrasi_anggota SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM registrasi_anggota WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Registrasi;
