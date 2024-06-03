const Store = require("../models").Store;
const User = require("../models").User;

const statusMessage = require("../helpers/status.message");

module.exports = {
    createStore: async (req, res) => {
    try {
      const body = {
        name: req.body.name,
        userId: req.decoded.id,
        location: req.body.location,
      };
      const store = await Store.create(body);

      await User.update(
        {
          role: "SELLER",
        },
        {
          where: {
            id: req.decoded.id,
          },
        }
      );

      statusMessage(res, 201, true, "Create Store successful", store);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },

  getStore: async (req, res) => {
    try {
      const id = req.params.id;

      const store = await Store.findOne({
        where: {
          id: id,
        }
      })

      statusMessage(res, 201, true, "Get Store successful", store);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },

  updateStore: async (req, res) => {
    try {
      const id = req.params.id;

      const body = {
        name: req.body.name,
        userId: req.decoded.id,
        location: req.body.location,
      };

      const store = await Store.update(body, {
        where: {
          id,
        },
      });

      statusMessage(res, 201, true, "Update Store successful", store);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },

  deleteStore: async (req, res) => {
    try {
      const id = req.params.id;

      const store = await Store.destroy({
        where: {
          id,
        },
      });

      if (!store) {
        statusMessage(res, 404, false, "Store not found");
        return;
      }

      statusMessage(res, 201, true, "Delete Store successful", store);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },
};