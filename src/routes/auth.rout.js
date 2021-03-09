const router = require("express").Router();

const { signUp, signIn } = require("../controller/auth.controller");
router.post("/signin", signIn);
router.get("/", (req, res) => res.send("get"));
router.post("/signup", signUp);
module.exports = router;
