const Category = require("../models/category");
const slugify = require("slugify");
module.exports = {
  addCategory,
  getCategories,
};

async function addCategory(req, res) {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new Category(categoryObj);
  cat.save((err, category) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (category) {
      return res.status(201).json({ category });
    }
  });
}
async function getCategories(req, res) {
  const list = await Category.find({});
  if (list) {
    res.status(200).json({ list });
  }
}
