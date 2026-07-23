const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');

const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const beritaRoutes = require('./berita.routes');
const pengurusRoutes = require('./pengurus.routes');
const divisiRoutes = require('./divisi.routes');
const registrasiRoutes = require('./registrasi.routes');
const settingsRoutes = require('./settings.routes');

router.use('/auth', authRoutes);
router.use('/users', verifyToken, usersRoutes);
router.use('/berita', beritaRoutes);
router.use('/pengurus', pengurusRoutes);
router.use('/divisi', verifyToken, divisiRoutes);
router.use('/registrasi', verifyToken, registrasiRoutes);
router.use('/registration-settings', settingsRoutes);

module.exports = router;
