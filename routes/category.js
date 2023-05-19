import { Router } from "express";
import categories from "../Data/categories.js";
import beds from "../Data/beds.js";

var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("category", {
    beds: beds,
    categories: categories,
 
    Email: req.session && req.session.Email !== undefined ? req.session.Email : "",
  });
});

export default router;
