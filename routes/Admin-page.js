import { Router } from "express";
import {
  addproduct,
  addcategory,
  getallproducts,
} from "../controllers/Admin.js";
var router = Router();

// check if admin
// router.use((req, res, next) => {
//   if (req.session.email !== undefined && req.session.email.Type === "admin") {
//     next();
//   } else {
//     res.render("./", {
//       err: "You are not an Admin",
//       user: req.session.email === undefined ? "" : req.session.email,
//     });
//   }
// });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Admin-page", {
    Email:
      req.session && req.session.Email !== undefined ? req.session.Email : "",
  });
});

router.post("/addproduct", addproduct);

router.post("/addcategory", addcategory);
router.get("/allproducts", getallproducts);

export default router;
