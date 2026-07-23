const Registrasi = require('../models/registrasi.model');
const Settings = require('../models/settings.model');

const registrasi = {
  async getAll(req, res, next) {
    try {
      const data = await Registrasi.getAll();
      return res.status(200).json({ statusCode: 200, message: 'Registrasi retrieved successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Registrasi.getById(id);

      if (!data) {
        return res.status(404).json({ statusCode: 404, message: 'Registrasi not found.' });
      }

      return res.status(200).json({ statusCode: 200, message: 'Registrasi retrieved successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const status = await Settings.getStatus();
      if (status.status !== 'open') {
        return res.status(403).json({ statusCode: 403, message: status.message });
      }

      const { nama_lengkap, nim, angkatan, kelas, email, no_whatsapp, alasan_bergabung } = req.body;

      if (!nama_lengkap || !nim || !angkatan || !kelas || !email || !no_whatsapp || !alasan_bergabung) {
        return res.status(400).json({ statusCode: 400, message: 'All fields are required.' });
      }

      const existingList = await Registrasi.getAll();
      const duplicate = existingList.find(r => r.email === email || r.nim === nim);
      if (duplicate) {
        return res.status(409).json({ statusCode: 409, message: 'Email or NIM already registered.' });
      }

      const id = await Registrasi.create({ nama_lengkap, nim, angkatan, kelas, email, no_whatsapp, alasan_bergabung });
      const data = await Registrasi.getById(id);

      return res.status(201).json({ statusCode: 201, message: 'Registrasi created successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await Registrasi.getById(id);

      if (!existing) {
        return res.status(404).json({ statusCode: 404, message: 'Registrasi not found.' });
      }

      const updated = await Registrasi.update(id, req.body);
      if (!updated) {
        return res.status(400).json({ statusCode: 400, message: 'No changes made.' });
      }

      const data = await Registrasi.getById(id);
      return res.status(200).json({ statusCode: 200, message: 'Registrasi updated successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await Registrasi.getById(id);

      if (!existing) {
        return res.status(404).json({ statusCode: 404, message: 'Registrasi not found.' });
      }

      await Registrasi.delete(id);
      return res.status(200).json({ statusCode: 200, message: 'Registrasi deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = registrasi;
