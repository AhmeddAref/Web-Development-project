import { Router } from "express";
import {
  validateSignup,
  signupController,
  checkuser,
  checkemail,
} from "../controllers/valcontroller.js";

const router = Router();
const errors = "";

/* GET home page. */

router.get("/", function (req, res, next) {
  const errorMessage = req.query.error || "";
  res.render("form", {
    err: "",
    errorMessage: errorMessage,
    errors: errors,
    mode: "",
    Email:
      req.session && req.session.Email !== undefined ? req.session.Email : "",
  });
});

// signup page
router.post("/signup", validateSignup, signupController);
router.post("/checkemail", checkemail);
// signin page
router.post("/signin", checkuser);

export default router;
