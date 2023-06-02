import { Router } from "express";
//import cart from "../Data/cart.js";

var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const cartItems = req.session.cartItems || [];
  res.render("checkout-page", {
    cart: { items: cartItems },
    Email:
      req.session && req.session.Email !== undefined ? req.session.Email : "",
  });
});

export default router;
