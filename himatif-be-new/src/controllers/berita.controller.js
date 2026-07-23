const fs = require('fs');
const path = require('path');
const Berita = require('../models/berita.model');

const berita = {
  async getAll(req, res, next) {
    try {
      const data = await Berita.getAll();
      return res.status(200).json({ statusCode: 200, message: 'Berita retrieved successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Berita.getById(id);

      if (!data) {
        return res.status(404).json({ statusCode: 404, message: 'Berita not found.' });
      }

      return res.status(200).json({ statusCode: 200, message: 'Berita retrieved successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const data = await Berita.getBySlug(slug);

      if (!data) {
        return res.status(404).json({ statusCode: 404, message: 'Berita not found.' });
      }

      return res.status(200).json({ statusCode: 200, message: 'Berita retrieved successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { slug, title, category, date, author, excerpt, content } = req.body;

      if (!title) {
        return res.status(400).json({ statusCode: 400, message: 'Title is required.' });
      }

      const image = req.file ? `image/berita/${req.file.filename}` : null;

      const id = await Berita.create({ slug, title, image, category, date, author, excerpt, content });
      const data = await Berita.getById(id);

      return res.status(201).json({ statusCode: 201, message: 'Berita created successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await Berita.getById(id);

      if (!existing) {
        return res.status(404).json({ statusCode: 404, message: 'Berita not found.' });
      }

      const updates = { ...req.body };

      if (req.file) {
        if (existing.image) {
          const oldPath = path.join(__dirname, '../../public', existing.image);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
        updates.image = `image/berita/${req.file.filename}`;
      }

      const updated = await Berita.update(id, updates);
      if (!updated) {
        return res.status(400).json({ statusCode: 400, message: 'No changes made.' });
      }

      const data = await Berita.getById(id);
      return res.status(200).json({ statusCode: 200, message: 'Berita updated successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await Berita.getById(id);

      if (!existing) {
        return res.status(404).json({ statusCode: 404, message: 'Berita not found.' });
      }

      if (existing.image) {
        const filePath = path.join(__dirname, '../../public', existing.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await Berita.delete(id);
      return res.status(200).json({ statusCode: 200, message: 'Berita deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = berita;
