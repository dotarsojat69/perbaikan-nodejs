const {
    register,
    login,
    updateUser,
    getUser,
    deleteUser
  } = require("../controllers/user.controller");
  const router = require("../helpers/router");
  const authentication = require("../middlewares/auth");
  
  router.post("/register", register);
  router.post("/login", login);
  router.use(authentication);
  router.get("/get/:id", getUser);
  router.put("/update/:id", updateUser);
  router.put("/delete/:id", deleteUser);
  
  module.exports = router;