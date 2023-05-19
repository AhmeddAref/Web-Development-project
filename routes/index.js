import { Router } from "express";

import cat from "../Data/cat.js";
import offers from "../Data/offers.js";
import slides from "../Data/slides.js";


var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    cat: cat,
    offers: offers,
    slides: slides,
   
    Email: req.session && req.session.Email !== undefined ? req.session.Email : "",
  
  });
});

export default router;
