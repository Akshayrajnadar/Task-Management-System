const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/adduser', userController.adduser);
router.post('/getUser', userController.getUser);
