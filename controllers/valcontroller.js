import { body, validationResult } from "express-validator";
import users from "../models/users.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

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

const signupController = async (req, res) => {
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
      Type:
        req.session && req.session.Type !== undefined ? req.session.Type : "",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new users({
      name: req.body.fullname,
      email: req.body.email,
      phonenumber: req.body.phone,
      password: hashedPassword,
      Type: req.body.type,
    });

    await user.save().then((result) => {
      res.redirect("/form");
    });

    console.log("User saved successfully");
    res.send("User saved successfully");
  } catch (error) {
    console.log(error);
  }
};

const validateCheckUser = [
  body("Email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const checkuser = async (req, res) => {
  const email = req.body.Email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.redirect("/form?error=Invalid information. Please try again.");
  }

  const user = await users.findOne({ email: email });
  if (!user) {
    res.redirect("/form?error=Invalid information. Please try again.");
  } else {
    bcrypt.compare(password, user.password).then((passwordMatch) => {
      if (passwordMatch) {
        req.session.Email = email;
        req.session.Type = user.Type;

        res.redirect("/");
      } else {
        res.redirect("/form?error=Invalid information. Please try again.");
      }
    });
  }
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
