import { Router } from "express";
import { getproduct } from "../controllers/products.js";

var router = Router();

// router.get("/:id", (req, res, next) => {
//   res.render("Product-page", {
//
//   });
// });

router.get("/:id", getproduct);

export default router;
