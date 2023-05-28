import { body, validationResult } from "express-validator";
import users from "../models/users.js";

const validateSignup = [
  body("fullname").notEmpty().withMessage("fullname is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
  body("phonenumber")
    .notEmpty()
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be 11 digits"),
];

// Process signup form
const signupController = (req, res) => {
  const errors = validationResult(req);
  const errorMessage = req.query.error || "";
  if (!errors.isEmpty()) {
    res.render("form", {
      errorMessage: errorMessage,
      title: "Signup page - Validation Failed",
      errors: errors.array(),
      Email:
        req.session && req.session.Email !== undefined ? req.session.Email : "",
    });
  } else {
    // Process the signup logic
    res.send("Signup successful");
  }
};

const checkuser = (req, res) => {
  var email = req.body.Email;
  var password = req.body.password;

  users
    .findOne({ email: email, password: password })
    .then((result) => {
      if (result) {
        req.session.Email = email;

        res.redirect("/");
      } else {
        res.redirect("/form?error=Invalid information. Please try again.");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

export { validateSignup, signupController, checkuser };
