const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ statusCode: 400, message: 'Email and password are required.' });
      }

      const user = await User.getByEmail(email);
      if (!user) {
        return res.status(401).json({ statusCode: 401, message: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ statusCode: 401, message: 'Invalid email or password.' });
      }

      const token = jwt.sign(
        { id: user.user_id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '6h' }
      );

      const { password: _, ...userData } = user;

      return res.status(200).json({
        statusCode: 200,
        message: 'Login successful.',
        data: { user: userData, token }
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = auth;
