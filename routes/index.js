import { Router } from "express";

import { getcategories } from "../controllers/homepage.js";

import categories from "../models/categories.js";

import offers from "../Data/offers.js";
import slides from "../Data/slides.js";
import cat from "../Data/cat.js";
const err = " ";
var router = Router();

/* GET home page. */
router.get("/", getcategories);

export default router;

// check if admin
router.use((req, res, next) => {
  if (req.session.Email !== undefined && req.session.Type === "admin") {
    next();
  } else {
    res.render("index", {
      cat: cat,
      offers: offers,
      slides: slides,
      err: "You are not an Admin",
      Email:
        req.session && req.session.Email !== undefined ? req.session.Email : "",
    });
  }
});
