import { Router } from "express";
import {
  validateSignup,
  signupController,
  checkuser,
} from "../controllers/valcontroller.js";

const router = Router();
const errors = "";

/* GET home page. */
router.get("/", function (req, res, next) {
  const errorMessage = req.query.error || "";
  res.render("form", {
    errorMessage: errorMessage,
    errors: errors,
    Email:
      req.session && req.session.Email !== undefined ? req.session.Email : "",
  });
});

// signup page
router.post("/signup", validateSignup, signupController);

// signin page
router.post("/signin", checkuser);

export default router;
