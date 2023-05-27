import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import cart from "./Data/cart.js";
import index_router from "./routes/index.js";
import Admin_router from "./routes/Admin-page.js";
import cart_router from "./routes/cart-page.js";
import category_router from "./routes/category.js";
import checkout_router from "./routes/chechout-page.js";
import form_router from "./routes/form.js";
import product_router from "./routes/product-page.js";
import users from "./models/users.js";
import products from "./models/products.js";

import path from "path";
import fileUpload from "express-fileupload";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

const dbURI =
  "mongodb+srv://OmarHosny18:i6EsIoO2Dd5Naob7@cluster0.bmkpjny.mongodb.net/project?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(9999))
  .catch((err) => console.log(err));
app.use(fileUpload());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", index_router);
app.use("/Admin-page", Admin_router);
app.use("/cart-page", cart_router);
app.use("/category", category_router);
app.use("/checkout-page", checkout_router);
app.use("/form", form_router);
app.use("/product-page", product_router);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//-------------------------------------------//

// get data from offers card
app.post("/save-data", (req, res) => {
  const data = req.body;

  cart.items.push(data);
  cart.subtotal = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  cart.tax = cart.subtotal * 0.05;
  cart.total = cart.subtotal + cart.tax + cart.shipping;

  res.status(200).send("Data received");
});

// handle remove button
app.post("/remove-item", (req, res) => {
  const data = req.body;

  const itemIndex = cart.items.findIndex((item) => item.title === data.title);

  if (itemIndex !== -1) {
    cart.items.splice(itemIndex, 1);

    cart.subtotal = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    cart.tax = cart.subtotal * 0.05;
    cart.total = cart.subtotal + cart.tax + cart.shipping;

    res.status(200).json({ message: "Item removed successfully" });
  } else {
    res.status(400).json({ message: "Item not found in cart" });
  }
});

//-------------------------------------------//

app.post("/signin", (req, res) => {
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
});

app.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//--------------------sign up
app.post("/signup", urlencodedParser, (req, res) => {
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
});

//----------------------Validation form------------------//

//---------------------------------------------------------//

export { __dirname, app };
