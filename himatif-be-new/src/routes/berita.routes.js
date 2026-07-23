const router = require('express').Router();
const berita = require('../controllers/berita.controller');
const { uploadTo } = require('../config/multer');
const { verifyToken, authorize } = require('../middleware/auth');

const uploadBerita = uploadTo('berita');

router.get('/', berita.getAll);
router.get('/:id', berita.getById);
router.get('/slug/:slug', berita.getBySlug);
router.post('/', verifyToken, authorize('admin', 'informasi'), uploadBerita.single('foto'), berita.create);
router.post('/:id', verifyToken, authorize('admin', 'informasi'), uploadBerita.single('foto'), berita.update);
router.delete('/:id', verifyToken, authorize('admin', 'informasi'), berita.delete);

module.exports = router;
