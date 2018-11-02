var router = require('express').Router();
 
router.use('/todo', require('./todo'));
router.use('/todo/task', require('./task'));
 
 
 
module.exports = router;