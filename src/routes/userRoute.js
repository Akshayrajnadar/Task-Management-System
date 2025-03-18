const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/adduser', userController.adduser);
router.get('/getAllUser', userController.getUser);
router.post('/getUser', userController.getUser);
router.post('/userlogin', userController.userlogin)

module.exports = router;