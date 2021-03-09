const express = require("express");
const app = express();
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/auth.rout");
const AdminRoutes = require("./routes/admin/auth.rout");
const options = { useNewUrlParser: true, useUnifiedTopology: true };
env.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
const PORT = process.env.PORT;
app.use("/api", userRoutes);
app.use("/api", AdminRoutes);
mongoose.connect(process.env.MONGO_URL, options);
mongoose.connection.once("open", () => console.log("Db connected"));
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));