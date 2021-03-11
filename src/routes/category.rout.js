const router = require("express").Router();
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  addCategory,
  getCategories,
} = require("../controller/category.controller");

router.post("/category/create", requireSignin, adminMiddleware, addCategory);
router.get("/category/getcategory", getCategories);

module.exports = router;
