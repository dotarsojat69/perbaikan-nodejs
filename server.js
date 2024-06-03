require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require('./routes/user.route')
const productRouter = require('./routes/product.route')
const storeRouter = require('./routes/store.route')
const transactionRouter = require('./routes/transaction.route')

app.use('/users', userRouter)
app.use('/product', productRouter)
app.use('/store', storeRouter)
app.use('/transaction', transactionRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});