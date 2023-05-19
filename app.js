import express from "express";
import session from "express-session";

import cart from "./Data/cart.js";
import index_router from "./routes/index.js";
import Admin_router from "./routes/Admin-page.js";
import cart_router from "./routes/cart-page.js";
import category_router from "./routes/category.js";
import checkout_router from "./routes/chechout-page.js";
import form_router from "./routes/form.js";

import product_router from "./routes/product-page.js";

const app = express();



app.use("/", index_router);
app.use("/Admin-page", Admin_router);
app.use("/cart-page", cart_router);
app.use("/category", category_router);
app.use("/checkout-page", checkout_router);
app.use("/form", form_router);
app.use("/product-page", product_router);


app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

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




app.get("/signin", (req, res) => {
  if (req.query.Email === "omar@gmail.com") {
    req.session.isLoggedIn = true;
    req.session.Email = req.query.Email;
    res.redirect("/");
  } else {
    res.redirect("/form.ejs");
  }
});

app.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});