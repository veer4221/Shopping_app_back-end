const Product = require("../models/product.model");
const shortid = require("shortid");
const slugify = require("slugify");
module.exports = {
  createProduct,
};

async function createProduct(req, res) {
  const { name, price, description, quantity, category, createdBy } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    quantity,
    productPictures,
    category,
    createdBy: req.user._id,
  });
  const newproduct = await product.save();
  res.status(201).json({ newproduct });
}
