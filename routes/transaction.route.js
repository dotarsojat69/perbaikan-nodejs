const authentication = require('../middlewares/auth')
const router = require('../helpers/router');
const { createTransaction, getTransaction } = require('../controllers/transaction.controller');

router.use(authentication)
router.get('/get-transaction', getTransaction)
router.post('/create-transaction', createTransaction)

module.exports = router;