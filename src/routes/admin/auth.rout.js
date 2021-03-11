const router = require("express").Router();
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/auth.validators");

const { signUp, signIn } = require("../../controller/admin/auth.controller");
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signIn);
router.post("/admin/signup", validateSignupRequest, isRequestValidated, signUp);

module.exports = router;
