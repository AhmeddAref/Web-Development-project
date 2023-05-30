import categories from "../models/categories.js";
import beds from "../Data/beds.js";

const getcategories = (req, res) => {
  categories
    .find()
    .then((result) => {
      res.render("category", {
        categories: result,
        beds: beds,
        Email:
          req.session && req.session.Email !== undefined
            ? req.session.Email
            : "",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getcategories };
