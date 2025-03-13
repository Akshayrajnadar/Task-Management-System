const router = require('express').Router();
const adminController = require('../controller/adminController');
const { route } = require('./userRoute');

router.post('/addadmin', adminController.addAdmin)
router.post('/adminlogin', adminController.adminlogin)

module.exports = router;