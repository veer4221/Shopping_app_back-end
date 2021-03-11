const router = require("express").Router();
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/auth.validators");
const { signUp, signIn } = require("../controller/auth.controller");
router.post("/signin", validateSigninRequest, isRequestValidated, signIn);
router.post("/signup", validateSignupRequest, isRequestValidated, signUp);

module.exports = router;
