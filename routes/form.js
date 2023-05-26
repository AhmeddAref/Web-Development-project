import { Router } from "express";
import {
  validateSignup,
  signupController,
} from "../controllers/valcontroller.js";

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

// GET home page
router.get("/signup", function (req, res, next) {
  console.log("index.js: GET /");
  res.render("pages/signup", { title: "Signup page", errors: [] });
});

// signup page
router.post("/signup", validateSignup, signupController);

// login page
router.post("/login", function (req, res, next) {
  res.send("login: respond with a resource");
});

export default router;
