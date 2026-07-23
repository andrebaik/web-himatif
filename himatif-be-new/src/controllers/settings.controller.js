const Settings = require('../models/settings.model');

const settings = {
  async getSettings(req, res, next) {
    try {
      const data = await Settings.getSettings();

      if (!data) {
        return res.status(404).json({ statusCode: 404, message: 'Settings not found.' });
      }

      return res.status(200).json({ statusCode: 200, message: 'Settings retrieved successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async updateSettings(req, res, next) {
    try {
      const { registration_open, registration_close, is_active } = req.body;

      if (registration_open && registration_close) {
        const open = new Date(registration_open);
        const close = new Date(registration_close);
        if (close <= open) {
          return res.status(400).json({ statusCode: 400, message: 'Registration close must be after registration open.' });
        }
      }

      const updated = await Settings.updateSettings({ registration_open, registration_close, is_active });
      if (!updated) {
        return res.status(400).json({ statusCode: 400, message: 'No changes made.' });
      }

      const data = await Settings.getSettings();
      return res.status(200).json({ statusCode: 200, message: 'Settings updated successfully.', data });
    } catch (error) {
      next(error);
    }
  },

  async checkStatus(req, res, next) {
    try {
      const data = await Settings.getStatus();
      return res.status(200).json({ statusCode: 200, message: 'Registration status retrieved.', data });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = settings;
