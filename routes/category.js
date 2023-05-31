import { Router } from "express";
import { getprod } from "../controllers/category.js";
import { getcategories } from "../controllers/category.js";

var router = Router();

/* GET home page. */
router.get("/", getcategories);

export default router;
router.get("/", getcategories,getprod);