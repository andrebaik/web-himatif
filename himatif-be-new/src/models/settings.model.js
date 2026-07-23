const pool = require('../config/database');

const Settings = {
  async getSettings() {
    const [rows] = await pool.query('SELECT * FROM registration_settings LIMIT 1');
    return rows[0] || null;
  },

  async updateSettings(data) {
    const existing = await this.getSettings();

    if (existing) {
      const fields = [];
      const values = [];

      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (fields.length === 0) return false;

      const [result] = await pool.query(`UPDATE registration_settings SET ${fields.join(', ')} WHERE id = ?`, [...values, existing.id]);
      return result.affectedRows > 0;
    } else {
      const id = await this.createSettings(data);
      return id > 0;
    }
  },

  async createSettings(data) {
    const { registration_open, registration_close, is_active } = data;
    const [result] = await pool.query(
      'INSERT INTO registration_settings (registration_open, registration_close, is_active) VALUES (?, ?, ?)',
      [registration_open, registration_close, is_active ?? 1]
    );
    return result.insertId;
  },

  async getStatus() {
    const settings = await this.getSettings();

    if (!settings || !settings.is_active) {
      return { status: 'inactive', message: 'Pendaftaran sedang tidak aktif.' };
    }

    const now = new Date();
    const open = new Date(settings.registration_open);
    const close = new Date(settings.registration_close);

    if (now < open) {
      return { status: 'not_started', message: 'Pendaftaran belum dibuka.' };
    }

    if (now > close) {
      return { status: 'closed', message: 'Pendaftaran sudah ditutup.' };
    }

    return { status: 'open', message: 'Pendaftaran sedang dibuka.' };
  }
};

module.exports = Settings;
