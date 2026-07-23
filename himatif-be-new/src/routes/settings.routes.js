const router = require('express').Router();
const settings = require('../controllers/settings.controller');

router.get('/', settings.getSettings);
router.put('/', settings.updateSettings);
router.get('/status', settings.checkStatus);

module.exports = router;
