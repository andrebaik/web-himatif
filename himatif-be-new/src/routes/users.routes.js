const router = require('express').Router();
const users = require('../controllers/users.controller');

router.get('/', users.getAll);
router.get('/:id', users.getById);
router.post('/', users.create);
router.put('/:id', users.update);
router.delete('/:id', users.delete);

module.exports = router;
