import categories from "../models/categories.js";
import products from "../models/products.js";

const getcategories = (req, res) => {
  categories.find().then((cat) => {
    products
      .find()
      .then((result) => {
        res.render("category", {
          categories: cat,
          products: result,
          Email:
            req.session && req.session.Email !== undefined
              ? req.session.Email
              : "",
          Type:
            req.session && req.session.Type !== undefined
              ? req.session.Type
              : "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const getproductbycat = (req, res) => {
  categories.find().then((cat) => {
    products
      .find({ category: req.params.category })
      .then((result) => {
        res.render("category", {
          categories: cat,
          products: result,
          Email:
            req.session && req.session.Email !== undefined
              ? req.session.Email
              : "",
          Type:
            req.session && req.session.Type !== undefined
              ? req.session.Type
              : "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export { getcategories, getproductbycat };
