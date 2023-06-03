import { Router } from "express";

import { getcategories, getproductbycat } from "../controllers/category.js";

var router = Router();

/* GET home page. */
router.get("/", getcategories);
router.get("/getproductbycat/:category", getproductbycat);

export default router;
