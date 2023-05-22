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
import { check } from "express-validator";
import { validationResult } from "express-validator";
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

app.post(
  "/register",

  [
    check("fullname", "This fullname must me 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(422).jsonp(errors.array())
      res.send("error");
    } else {
      res.redirect(307, "/signup");
    }
  }
);
app.post("/add-product", (req, res) => {
  let imgFiles = [];
  let uploadPaths = [];

  console.log(req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  imgFiles.push(req.files.img1);
  imgFiles.push(req.files.img2);
  imgFiles.push(req.files.img3);
  imgFiles.push(req.files.img4);

  for (let i = 0; i < imgFiles.length; i++) {
    const imgFile = imgFiles[i];
    const uploadPath =
      __dirname +
      "/public/images/" +
      req.body.un +
      "_img" +
      (i + 1) +
      path.extname(imgFile.name);

    uploadPaths.push(uploadPath);

    imgFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      // Check if all images have been successfully uploaded
      if (uploadPaths.length === imgFiles.length && i === imgFiles.length - 1) {
        const product = new products({
          name: req.body.name,
          description: req.body.description,
          color: req.body.color,
          category: req.body.category,
          shippingArea: req.body.shippingArea,
          oldPrice: req.body.oldprice,
          newPrice: req.body.newprice,
          image1: req.body.name + "_img1" + path.extname(imgFiles[0].name),
          image2: req.body.name + "_img2" + path.extname(imgFiles[1].name),
          image3: req.body.name + "_img3" + path.extname(imgFiles[2].name),
          image4: req.body.name + "_img4" + path.extname(imgFiles[3].name),
        });

        product
          .save()
          .then((result) => {
            res.redirect("/Admin-page");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Error saving product to database.");
          });
      }
    });
  }
});
