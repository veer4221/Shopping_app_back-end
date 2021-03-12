const router = require("express").Router();
const { requireSignin, userMiddleware } = require("../common-middleware");
const { addItemToCart } = require("../controller/cart.controller");

router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);
// router.get("/category/getcategory", getCategories);

module.exports = router;
