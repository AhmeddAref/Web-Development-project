import { Router } from "express";

import { getcategories } from "../controllers/category.js";

var router = Router();

/* GET home page. */
router.get("/", getcategories);

export default router;
