const router = require("express").Router();
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/auth.validators");

const {
  signUp,
  signIn,
  signout,
} = require("../../controller/admin/auth.controller");
const { requireSignin } = require("../../common-middleware");
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signIn);
router.post("/admin/signup", validateSignupRequest, isRequestValidated, signUp);
router.post("/admin/signout", requireSignin, signout);

module.exports = router;
