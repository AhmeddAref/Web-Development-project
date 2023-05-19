import { Router } from "express";
import prod from "../Data/products.js";

var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Product-page", {
    prod: prod,
    Email: req.session && req.session.Email !== undefined ? req.session.Email : "",
  });
});

export default router;
