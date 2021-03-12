const express = require("express");
const app = express();
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/auth.rout");
const AdminRoutes = require("./routes/admin/auth.rout");
const categoryRoutes = require("./routes/category.rout");
const productRoutes = require("./routes/product.rout");
const cartRoutes = require("./routes/cart.rout");
const path = require("path");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
env.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
const PORT = process.env.PORT;
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", userRoutes);
app.use("/api", AdminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
mongoose.connect(process.env.MONGO_URL, options);
mongoose.connection.once("open", () => console.log("Db connected"));
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
