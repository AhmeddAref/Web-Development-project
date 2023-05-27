import { Router } from "express";
import { addproduct, addcategory } from "../controllers/Admin.js";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Admin-page", {
    Email:
      req.session && req.session.Email !== undefined ? req.session.Email : "",
  });
});

router.post("/addproduct", addproduct);

router.post("/addcategory", addcategory);

export default router;
