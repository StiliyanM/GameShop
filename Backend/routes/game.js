const router = require('express').Router();
const gameController = require('../controllers/game');
const auth = require('../middleware/auth')

router.get('/all', gameController.all);
router.get('/details/:gameId', gameController.getSingle);
router.post('/add', auth.isInRole('Admin'), gameController.add);
router.put('/edit/:gameId', auth.isInRole('Admin'), gameController.edit);
router.delete('/delete/:gameId', auth.isInRole('Admin'), gameController.delete);

module.exports = router;