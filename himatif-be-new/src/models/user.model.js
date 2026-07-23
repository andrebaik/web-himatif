const pool = require('../config/database');

const User = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    return rows[0] || null;
  },

  async getByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async create(data) {
    const { email, password, full_name, role, is_active } = data;
    const [result] = await pool.query(
      'INSERT INTO users (email, password, full_name, role, is_active) VALUES (?, ?, ?, ?, ?)',
      [email, password, full_name, role || 'informasi', is_active ?? 1]
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
    const [result] = await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = User;
