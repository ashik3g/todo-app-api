const router = require('express').Router();
const authenticate = require('../middleware/authenticate')
const authRoutes = require('./auth');
const taskRoutes = require('./task')

router.use('/api/v1/auth',authRoutes);
router.use('/api/v1/task',authenticate,taskRoutes);

module.exports = router;