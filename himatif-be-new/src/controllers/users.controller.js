const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const users = {
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();
      return res.status(200).json({ statusCode: 200, message: 'Users retrieved successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.getById(id);

      if (!user) {
        return res.status(404).json({ statusCode: 404, message: 'User not found.' });
      }

      if (req.user.role !== 'super_admin' && req.user.role !== 'admin' && req.user.id !== user.user_id) {
        return res.status(403).json({ statusCode: 403, message: 'Forbidden.' });
      }

      const { password: _, ...userData } = user;
      return res.status(200).json({ statusCode: 200, message: 'User retrieved successfully.', data: userData });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { email, password, full_name, role, is_active } = req.body;

      if (!email || !password || !full_name) {
        return res.status(400).json({ statusCode: 400, message: 'Email, password, and full_name are required.' });
      }

      const existing = await User.getByEmail(email);
      if (existing) {
        return res.status(409).json({ statusCode: 409, message: 'Email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const id = await User.create({ email, password: hashedPassword, full_name, role, is_active });

      const user = await User.getById(id);
      const { password: _, ...userData } = user;

      return res.status(201).json({ statusCode: 201, message: 'User created successfully.', data: userData });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updates = { ...req.body };

      const user = await User.getById(id);
      if (!user) {
        return res.status(404).json({ statusCode: 404, message: 'User not found.' });
      }

      if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
        delete updates.role;
      }

      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }

      const updated = await User.update(id, updates);
      if (!updated) {
        return res.status(400).json({ statusCode: 400, message: 'No changes made.' });
      }

      const updatedUser = await User.getById(id);
      const { password: _, ...userData } = updatedUser;

      return res.status(200).json({ statusCode: 200, message: 'User updated successfully.', data: userData });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.getById(id);
      if (!user) {
        return res.status(404).json({ statusCode: 404, message: 'User not found.' });
      }

      await User.delete(id);
      return res.status(200).json({ statusCode: 200, message: 'User deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = users;
