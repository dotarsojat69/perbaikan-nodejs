const { createStore, deleteStore, updateStore, getStore } = require('../controllers/store.controller');
const authentication = require('../middlewares/auth')
const router = require('../helpers/router');
const { sellerAuthorization, buyerAuthorization } = require('../middlewares/authorize');

router.use(authentication)
router.get('/get-store/:id', buyerAuthorization, getStore);
router.post('/create-store', buyerAuthorization, createStore);
router.use(sellerAuthorization)
router.put('/update-store/:id', updateStore);
router.delete('/delete-store/:id', deleteStore);

module.exports = router;