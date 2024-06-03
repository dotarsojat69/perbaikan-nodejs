const { getProduct, createProduct, getDetailProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')
const router = require('../helpers/router')
const authentication = require('../middlewares/auth')
const { sellerAuthorization, buyerAuthorization } = require('../middlewares/authorize')

router.get('/getAllProduct', buyerAuthorization, getProduct)
router.get('/detail-product/:id', buyerAuthorization, getDetailProduct)
router.use(authentication)
router.use(sellerAuthorization)
router.post('/create-product', createProduct)
router.put('/update-product/:id', updateProduct)
router.delete('/delete-product/:id', deleteProduct)

module.exports = router