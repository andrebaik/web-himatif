const router = require('express').Router();
const pengurus = require('../controllers/pengurus.controller');
const { uploadTo } = require('../config/multer');
const { verifyToken, authorize } = require('../middleware/auth');

const uploadPengurus = uploadTo('pengurus');

router.get('/', pengurus.getAll);
router.get('/:id', pengurus.getById);
router.post('/', verifyToken, authorize('admin'), uploadPengurus.single('foto'), pengurus.create);
router.post('/:id', verifyToken, authorize('admin'), uploadPengurus.single('foto'), pengurus.update);
router.delete('/:id', verifyToken, authorize('admin'), pengurus.delete);

module.exports = router;
