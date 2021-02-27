const { Router } = require('express');
const router = new Router();

const requestController = require('../controllers/request.controller');

router.get('/', requestController.getRequests);
router.get('/:id', requestController.getRequest);
router.post('/', requestController.createRequest);
router.put('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);

module.exports = { router };