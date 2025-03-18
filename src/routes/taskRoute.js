const router = require('express').Router();
const taskController = require('../controller/taskController');

router.post('/addtask', taskController.addTask);
router.get('/gettask', taskController.getTask);
router.get('/gettaskId/:id', taskController.getTaskById);
router.post('/getUsertask', taskController.getUserTask);
router.put('/updateUserstask/:id', taskController.updateUsersTask);
router.delete('/deletetask/:id', taskController.deleteTask);

module.exports = router;