const jwt = require("jsonwebtoken");

module.exports = { requireSignin, adminMiddleware, userMiddleware };
async function requireSignin(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user);
    req.user = user;
  } else {
    res.status(400).json({ message: "Authorization required" });
  }
  next();
}
async function userMiddleware(req, res, next) {
  if (req.user.role !== "user") {
    return res.status(400).json({ messager: "User Access Denied" });
  }
  next();
}
async function adminMiddleware(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(400).json({ messager: "Admin Access Denied" });
  }
  next();
}
