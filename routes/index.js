import { Router } from "express";

import { getcategories } from "../controllers/homepage.js";

var router = Router();

/* GET home page. */
router.get("/", getcategories);

export default router;
