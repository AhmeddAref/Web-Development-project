import { Router } from "express";

import { getcategories, handleSearch } from "../controllers/homepage.js";

var router = Router();

/* GET home page. */
router.get("/", getcategories);
router.post("/index/search", handleSearch);

export default router;
