
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const { User } = require("../models");

const statusMessage = require("../helpers/status.message");

const secretKey = process.env.SECRET_KEY;

module.exports = {
  register: async (req, res) => {
    try {
      const payload = req.body;

      const user = await User.create(payload);

      statusMessage(res, 201, true, "Register successful", user);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const comparePassword = await bcrypt.compare(password, user.password);

        if (comparePassword) {
          const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
          };

          const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });

          const resData = {
            username: user.username,
            email: user.email,
            role: user.role,
            token: `Bearer ${token}`,
          };

          statusMessage(res, 200, true, "Login successful", resData);
        } else {
          statusMessage(res, 400, false, "Email or password mismatch");
        }
      } else {
        statusMessage(res, 400, false, "Email or password mismatch");
      }
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },

  getUser: async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByPk(id);

        statusMessage(res, 200, true, "Get User successful", user);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },

  updateUser: async (req, res) => {
    try {
        const id = req.params.id;
        const payload = req.body

        const user = await User.update(payload, {
            where: {
                id: id,
            }
        })
        statusMessage(res, 200, true, "Update successful", user);
    } catch (error) {
      statusMessage(res, 404, false, error.message);
    }
  },

deleteUser: async (req, res) => {
  try {
      const id = req.params.id;

      const user = await User.destroy({ where: { id }});
      
      statusMessage(res, 200, true, "Delete successful", user);
  } catch (error) {
    statusMessage(res, 404, false, error.message);
  }
},
};