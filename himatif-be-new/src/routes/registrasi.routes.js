const router = require('express').Router();
const registrasi = require('../controllers/registrasi.controller');

router.get('/', registrasi.getAll);
router.get('/:id', registrasi.getById);
router.post('/', registrasi.create);
router.put('/:id', registrasi.update);
router.delete('/:id', registrasi.delete);

module.exports = router;
