import categories from "../models/categories.js";

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
        err: "",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getcategories };
