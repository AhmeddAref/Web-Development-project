import { Router } from "express";
import { addcartdata } from "../controllers/cart.js";

var router = Router();

router.get("/", function (req, res, next) {
  const cartItems = req.session.cartItems || [];

  res.render("cart-page", {
    cart: { items: cartItems },
    Email:
      req.session && req.session.Email !== undefined ? req.session.Email : "",
  });
});

router.get("/addcartdata/:id", addcartdata);

export default router;
