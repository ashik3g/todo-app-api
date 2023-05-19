const router = require('express').Router();
const taskController = require('../controllers/task')

router.get('/',taskController.taskAllController)
router.get('/user',taskController.taskUserController)
router.post('/create',taskController.taskCreateController)
router.get('/:id',taskController.taskDetailsController)
router.delete('/:id',taskController.taskDeleteController)
router.patch('/:id',taskController.taskUpdateController)

module.exports = router;