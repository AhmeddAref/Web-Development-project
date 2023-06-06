import { Router } from "express";
import {
  addproduct,
  addcategory,
  getallproducts,
  editproduct,
  updateProduct,
  addoffers,
  deleteproduct,
  UserInfo,
  DeleteUser,
  toAdmin,
  toClient,
} from "../controllers/Admin.js";
import offers from "../Data/offers.js";
import categories from "../models/categories.js";
import users from "../models/users.js";

var router = Router();
// check if admin
router.use((req, res, next) => {
  if (req.session.Email !== undefined && req.session.Type === "admin") {
    next();
  } else {
    categories.find().then((result) => {
      res.render("index", {
        cat: result,
        offers: offers,

        err: "You are not an Admin",
        Email:
          req.session && req.session.Email !== undefined
            ? req.session.Email
            : "",
      });
    });
  }
});

/* GET home page. */
router.get("/", function (req, res, next) {
  users.find().then((result) => {
    res.render("Admin-page", {
      users: result,
      product: "",
      Email:
        req.session && req.session.Email !== undefined ? req.session.Email : "",
    });
  });
});

router.post("/addproduct", addproduct);

router.post("/addcategory", addcategory);
router.get("/allproducts", getallproducts);
router.get("/editproduct/:id", editproduct);
router.post("/editproduct/:id", updateProduct);
router.get("/addoffers/:id", addoffers);
router.get("/deleteproduct/:image1/:image2/:image3/:image4/:id", deleteproduct);

router.get("/:id", UserInfo);

router.get("/deleteuser/:id", DeleteUser);
router.get("/makeadmin/:id", toAdmin);
router.get("/makeclient/:id", toClient);

router.get("/products", () => {});

export default router;
