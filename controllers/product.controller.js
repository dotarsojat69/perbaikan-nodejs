const Product = require("../models").Product;

const statusMessage = require("../helpers/status.message");

module.exports = {
  getProduct: async (req, res) => {
    try {
      const product = await Product.findAll({
        include: ['User']
      });

      statusMessage(res, 201, true, "Get Product successful", product);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },

  createProduct: async (req, res) => {
    try {
      const body = {
        name: req.body.name,
        stock: req.body.stock,
        desc: req.body.desc,
        price: req.body.price,
        userId: req.decoded.id,
      };

      const product = await Product.create(body);

      statusMessage(res, 201, true, "Create product successful", product);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },

  getDetailProduct: async (req, res) => {
    try {
      const id = req.params.id;

      const product = await Product.findByPk(id, {
        include: ['User', 'Category']
      });

      if (!product) {
        statusMessage(res, 404, false, "product not found");
        return;
      }

      statusMessage(res, 201, true, "Get product successful", product);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;

      const body = {
        name: req.body.name,
        stock: req.body.stock,
        desc: req.body.desc,
        price: req.body.price,
        userId: req.decoded.id,
      };

      const product = await Product.update(body, {
        where: {
          id,
        },
      });

      if (!product) {
        statusMessage(res, 404, false, "Product not found");
        return;
      }

      statusMessage(res, 201, true, "Update Product successful", product);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;

      const product = await Product.destroy({
        where: {
          id,
        },
      });

      if (!product) {
        statusMessage(res, 404, false, "Product not found");
        return;
      }

      statusMessage(res, 201, true, "Delete Product successful", product);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },
};