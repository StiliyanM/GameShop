const router = require('express').Router();
const orderController = require('../controllers/order');

router.post('/checkout', orderController.checkout)

module.exports = router;