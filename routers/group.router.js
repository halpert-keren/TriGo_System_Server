const {Router} = require('express');
const router = new Router();

const groupController = require('../controllers/group.controller');

router.get('/', groupController.getGroups);
router.get('/:id', groupController.getGroup);
router.post('/', groupController.createGroup);
router.put('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);

module.exports = {router};