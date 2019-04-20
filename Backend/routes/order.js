const router = require('express').Router();
const orderController = require('../controllers/order');
const auth = require('../middleware/auth')
router.post('/checkout', auth.isAuthenticated, orderController.checkout)

module.exports = router;