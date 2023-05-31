import { Router } from "express";
import { getproduct } from "../controllers/products.js";
import prod from "../Data/products.js";

var router = Router();

router.get("/", (req, res, next) => {
  res.render("Product-page", {
    Email:
      req.session && req.session.Email !== undefined ? req.session.Email : "",
    prod: prod,
  });
});

//router.get("/:id", getproduct);

export default router;
