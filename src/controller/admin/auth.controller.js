const User = require("../../models/auth.model");
const jwt = require("jsonwebtoken");
module.exports = {
  signUp,
  signIn,
};
async function signIn(req, res) {
  let usr = await User.findOne({ email: req.body.email });
  console.log(usr);
  if (usr) {
    if (usr.authenticate(req.body.password) && usr.role === "admin") {
      const token = jwt.sign(
        { _id: usr._id, role: usr.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const { firstName, lastName, email, role, fullName } = usr;
      res.status(200).json({
        token,
        usr: {
          firstName,
          lastName,
          email,
          role,
          fullName,
        },
      });
    } else {
      return res.status(400).json({ message: "invalid Password" });
    }
  } else {
    return res.status(400).json({ message: "something went Wrong" });
  }
}
async function signUp(req, res) {
  let usr = await User.findOne({ email: req.body.email });
  if (usr) {
    return res.status(400).json({
      message: "Admin is already registered",
    });
  }
  const { firstName, lastName, email, password } = req.body;
  const _user = new User({
    firstName,
    lastName,
    email,
    password,
    username: Math.random().toString(),
    role: "admin",
  });
  _user.save((error, data) => {
    if (error) {
      return res.status(400).json({
        message: "somtjing is wrong",
      });
    }
    if (data) {
      return res.status(201).json({
        user: data,
        message: "admin created sucessfully",
      });
    }
  });
}
