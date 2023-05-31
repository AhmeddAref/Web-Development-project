import { Router } from "express";
import {
  addproduct,
  addcategory,
  getallproducts,
  editproduct,
  updateProduct,
} from "../controllers/Admin.js";

import offers from "../Data/offers.js";
import slides from "../Data/slides.js";
import cat from "../Data/cat.js";

var router = Router();
// check if admin
// router.use((req, res, next) => {
//   if (req.session.Email !== undefined && req.session.Type === "admin") {
//     next();
//   } else {
//     res.render("index", {
//       cat: cat,
//       offers: offers,
//       slides: slides,
//       err: "You are not an Admin",
//       Email:
//         req.session && req.session.Email !== undefined ? req.session.Email : "",
//     });
//   }
// });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Admin-page", {
    Email:
      req.session && req.session.Email !== undefined ? req.session.Email : "",
    product: "",
  });
});

router.post("/addproduct", addproduct);

router.post("/addcategory", addcategory);
router.get("/allproducts", getallproducts);
router.get("/editproduct/:id", editproduct);
router.post("/editproduct/:id", updateProduct);

router.get("/products", () => {});

export default router;
