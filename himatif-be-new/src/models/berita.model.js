const pool = require('../config/database');

const Berita = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM berita ORDER BY created_at DESC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM berita WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async getBySlug(slug) {
    const [rows] = await pool.query('SELECT * FROM berita WHERE slug = ?', [slug]);
    return rows[0] || null;
  },

  async create(data) {
    const { slug, title, image, category, date, author, excerpt, content } = data;
    const [result] = await pool.query(
      'INSERT INTO berita (slug, title, image, category, date, author, excerpt, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [slug, title, image, category, date, author, excerpt, content]
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
    const [result] = await pool.query(`UPDATE berita SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM berita WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Berita;
