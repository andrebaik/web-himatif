const fs = require('fs');
const path = require('path');
const Pengurus = require('../models/pengurus.model');

const pengurus = {
  async getAll(req, res, next) {
    try {
      const data = await Pengurus.getAll();
      return res.status(200).json({ statusCode: 200, message: 'Pengurus retrieved successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Pengurus.getById(id);

      if (!data) {
        return res.status(404).json({ statusCode: 404, message: 'Pengurus not found.' });
      }

      return res.status(200).json({ statusCode: 200, message: 'Pengurus retrieved successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { nama, nama_panggilan, jabatan, kutipan, instagram, linkedin, status, periode, divisi_id } = req.body;

      if (!nama) {
        return res.status(400).json({ statusCode: 400, message: 'Nama is required.' });
      }

      const foto = req.file ? `image/pengurus/${req.file.filename}` : null;

      const id = await Pengurus.create({ nama, nama_panggilan, jabatan, foto, kutipan, instagram, linkedin, status, periode, divisi_id });
      const data = await Pengurus.getById(id);

      return res.status(201).json({ statusCode: 201, message: 'Pengurus created successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await Pengurus.getById(id);

      if (!existing) {
        return res.status(404).json({ statusCode: 404, message: 'Pengurus not found.' });
      }

      const updates = { ...req.body };

      if (req.file) {
        if (existing.foto) {
          const oldPath = path.join(__dirname, '../../public', existing.foto);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
        updates.foto = `image/pengurus/${req.file.filename}`;
      }

      const updated = await Pengurus.update(id, updates);
      if (!updated) {
        return res.status(400).json({ statusCode: 400, message: 'No changes made.' });
      }

      const data = await Pengurus.getById(id);
      return res.status(200).json({ statusCode: 200, message: 'Pengurus updated successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await Pengurus.getById(id);

      if (!existing) {
        return res.status(404).json({ statusCode: 404, message: 'Pengurus not found.' });
      }

      if (existing.foto) {
        const filePath = path.join(__dirname, '../../public', existing.foto);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await Pengurus.delete(id);
      return res.status(200).json({ statusCode: 200, message: 'Pengurus deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = pengurus;
