import categories from "../models/categories.js";
import products from "../models/products.js";

import offers from "../Data/offers.js";

const getcategories = (req, res) => {
  categories
    .find()
    .then((result) => {
      res.render("index", {
        cat: result,
        offers: offers,

        Email:
          req.session && req.session.Email !== undefined
            ? req.session.Email
            : "",
        Type:
          req.session && req.session.Type !== undefined ? req.session.Type : "",
        err: "",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const handleSearch = async (req, res) => {
  try {
    const searchField = req.body.searchfield;
    const expression = new RegExp(searchField, "i");
    const results = await products.find({ name: { $regex: expression } });

    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the search." });
  }
};

export { getcategories, handleSearch };
