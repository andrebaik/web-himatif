const router = require('express').Router();
const divisi = require('../controllers/divisi.controller');

router.get('/', divisi.getAll);
router.get('/:id', divisi.getById);
router.post('/', divisi.create);
router.put('/:id', divisi.update);
router.delete('/:id', divisi.delete);

module.exports = router;
