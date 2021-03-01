const {Router} = require('express');
const router = new Router();

const trailController = require('../controllers/trail.controller');

router.get('/', trailController.getTrails);
router.get('/:id', trailController.getTrail);
router.post('/', trailController.createTrail);
router.put('/:id', trailController.updateTrail);
router.delete('/:id', trailController.deleteTrail);

module.exports = {router};