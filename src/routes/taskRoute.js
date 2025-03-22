const router = require('express').Router();
const taskController = require('../controller/taskController');

router.post('/addtask', taskController.addTask);
router.get('/gettask', taskController.getTask);
router.get('/gettaskId/:id', taskController.getTaskByUserId);
router.post('/getUsertask', taskController.getUserTask);
router.put('/updateUserstask/:id', taskController.updateUsersTask);
router.delete('/deletetask/:id', taskController.deleteTask);
router.put('/updatetask/:id', taskController.updatetaskbyid);
router.put('/updatetaskstatus/:id', taskController.updateTaskStatus);

module.exports = router;