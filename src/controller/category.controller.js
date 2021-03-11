const Category = require("../models/category");
const slugify = require("slugify");
module.exports = {
  addCategory,
  getCategories,
};
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}
// async function createCategories(list, parentId = null) {
//   const categoryList = [];
//   let category;
//   if (parentId == null) {
//     console.log("null");
//     category = list.filter((cat) => cat.parentId == undefined);
//   } else {
//     console.log("perent");

//     category = list.filter((cat) => cat.parentId == parentId);
//   }

//   for (let cate of category) {
//     categoryList.push({
//       _id: cate._id,
//       name: cate.name,
//       slug: cate.slug,
//       children: createCategories(list, cate._id),
//     });
//   }

//   return categoryList;
// }

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
// async function getCategories(req, res) {
//   const list = await Category.find({});
//   if (list) {
//     const categoryList = await createCategories(list);
//     res.status(200).json({ categoryList });
//   }
// }
async function getCategories(req, res) {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
}
