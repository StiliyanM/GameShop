const router = require('express').Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/history', auth.isAuthenticated, userController.purchaseHistory)
module.exports = router;