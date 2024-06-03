const Transaction = require("../models").Transaction;

const Product = require("../models").Product;
const { sequelize } = require("../models");

const statusMessage = require("../helpers/status.message");

const generateTransactionCode = () => {
  const firstDigit = Math.floor(Math.random() * 10);

  const randomChars = Math.random().toString(36).substring(2, 11).toUpperCase();

  const transactionCode = `${firstDigit}${randomChars}`;

  return transactionCode;
};

module.exports = {
  createTransaction: async (req, res) => {
    const t = await sequelize.transaction({ autocommit: false });

    try {
      const id = req.decoded.id;

      const cart = await cart.findAll({
        where: {
          userId: id,
        },
        include: ["Product"],
      });

      let totalPrice = 0;

      cart.forEach((item) => {
        totalPrice += item.Product.price * item.quantity;
      });

      const codeTransaction = generateTransactionCode();

      const transaction = await Transaction.create(
        {
          code_transaction: codeTransaction,
          total_price: totalPrice,
          userId: id,
        },
        { transaction: t }
      );

      await cart.destroy({ where: { user_id: id }, transaction: t });

      for (const item of cart) {
        const body = {
          transaction_id: transaction.id,
          product_id: item.Product.id,
          quantity: item.quantity,
          paymentMethod: req.body.paymentMethod,
        };

        await TransactionDetail.create(body, { transaction: t });

        await Product.decrement("stock", {
          by: item.quantity,
          where: { id: item.Product.id },
          transaction: t,
        });
      }

      await t.commit();

      statusMessage(
        res,
        201,
        true,
        "Create Transaction successful",
        transaction
      );
    } catch (error) {
      await t.rollback();

      statusMessage(res, 404, false, error.message);
    }
  },

  getTransaction: async (req, res) => {
    try {
      const id = req.decoded.id;

      const transaction = await Transaction.findAll({
        where: {
          userId: id,
        },
        include: [
          {
            model: TransactionDetail,
            include: [
              {
                model: Product,
              },
            ],
          },
        ],
      });

      statusMessage(res, 200, true, "Get Transaction successful", transaction);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },
};