const Divisi = require('../models/divisi.model');

const divisi = {
  async getAll(req, res, next) {
    try {
      const data = await Divisi.getAll();
      return res.status(200).json({ statusCode: 200, message: 'Divisi retrieved successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Divisi.getById(id);

      if (!data) {
        return res.status(404).json({ statusCode: 404, message: 'Divisi not found.' });
      }

      return res.status(200).json({ statusCode: 200, message: 'Divisi retrieved successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { nama_divisi, deskripsi } = req.body;

      if (!nama_divisi) {
        return res.status(400).json({ statusCode: 400, message: 'Nama divisi is required.' });
      }

      const id = await Divisi.create({ nama_divisi, deskripsi });
      const data = await Divisi.getById(id);

      return res.status(201).json({ statusCode: 201, message: 'Divisi created successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await Divisi.getById(id);

      if (!existing) {
        return res.status(404).json({ statusCode: 404, message: 'Divisi not found.' });
      }

      const updated = await Divisi.update(id, req.body);
      if (!updated) {
        return res.status(400).json({ statusCode: 400, message: 'No changes made.' });
      }

      const data = await Divisi.getById(id);
      return res.status(200).json({ statusCode: 200, message: 'Divisi updated successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await Divisi.getById(id);

      if (!existing) {
        return res.status(404).json({ statusCode: 404, message: 'Divisi not found.' });
      }

      await Divisi.delete(id);
      return res.status(200).json({ statusCode: 200, message: 'Divisi deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = divisi;
