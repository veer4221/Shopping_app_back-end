const router = require("express").Router();

const {
  signUp,
  signIn,
  requireSignin,
} = require("../../controller/admin/auth.controller");
router.post("/admin/signin", signIn);
router.post("/admin/signup", signUp);

module.exports = router;
