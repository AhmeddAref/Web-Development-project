import { Router } from "express";
import { getUser } from "../controllers/User.js";
var router = Router();



router.get("/", getUser);
export default router;
