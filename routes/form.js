import { Router } from "express";
const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const errorMessage = req.query.error || "";
  res.render("form", {
    errorMessage: errorMessage,
    Email:
      req.session && req.session.Email !== undefined ? req.session.Email : "",
  });
});

export default router;

import {
  validateSignup,
  signupController,
} from "../controllers/valcontroller.js";

// signup page
router.post("/form", validateSignup, signupController);

// login page
router.post("/login", function (req, res, next) {
  res.send("login: respond with a resource");
});
