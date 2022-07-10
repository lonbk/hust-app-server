const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/classes', meController.storedClasses);
router.get('/trash/classes', meController.trashClasses);

module.exports = router;