const express = require('express');
const router = express.Roulas();

const classeController = require('../app/controllers/ClasseController');

router.get('/create', classeController.create);
router.post('/store', classeController.store);
router.get('/:id/edit', classeController.edit);
router.post('/handle-form-actions', classeController.handleFormActions);
router.put('/:id', classeController.update);
router.patch('/:id/restore', classeController.restore);
router.delete('/:id', classeController.destroy);
router.delete('/:id/force', classeController.forceDestroy);
router.get('/:slug', classeController.show);

module.exports = router;
