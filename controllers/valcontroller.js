import { body, validationResult } from "express-validator";
import users from "../models/users.js";

const validateSignup = [
  body("fullname").notEmpty().withMessage("fullname is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("phone")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be 11 digits"),
  body("password")
    .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage("Numbers and special characters must be contained"),
  body("confirmpassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

// Process signup form

const signupController = (req, res) => {
  const errors = validationResult(req);
  const errorMessage = req.query.error || "";
  if (!errors.isEmpty()) {
    res.render("form", {
      err: "",
      errorMessage: errorMessage,
      title: "Signup page - Validation Failed",
      errors: errors.array(),
      mode: "signup",
      Email:
        req.session && req.session.Email !== undefined ? req.session.Email : "",
    });
  } else {
    const user = new users({
      name: req.body.fullname,
      email: req.body.email,
      phonenumber: req.body.phone,
      password: req.body.password,
      Type: req.body.type,
    });

    user
      .save()
      .then((result) => {
        res.redirect("/form");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const validateCheckUser = [
  body("Email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const checkuser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.redirect("/form?error=Invalid information. Please try again.");
  }

  const email = req.body.Email;
  const password = req.body.password;

  users
    .findOne({ email: email, password: password })
    .then((result) => {
      if (result) {
        req.session.Email = email;
        req.session.Type = result.Type;

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

const checkemail = (req, res) => {
  var query = { email: req.body.email };
  users
    .find(query)
    .then((result) => {
      if (result.length > 0) {
        res.send("already taken");
      } else {
        res.send("available");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  validateSignup,
  signupController,
  validateCheckUser,
  checkuser,
  checkemail,
};
