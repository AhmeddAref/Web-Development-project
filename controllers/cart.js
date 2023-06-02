import products from "../models/products.js";
const addcartdata = (req, res) => {
  if (req.session && req.session.Email !== undefined) {
    next();
  } else {
    const errorMessage = req.query.error || "";
    res.render("form", {
      err: "you must be logged in",
      errorMessage: errorMessage,
      errors: "",
      mode: "",
      Email:
        req.session && req.session.Email !== undefined ? req.session.Email : "",
    });
  }
  const productId = req.params.id;

  products
    .findOne({ _id: productId })
    .then((product) => {
      if (!product) {
        throw new Error("Product not found");
      }

      const cartItems = req.session.cartItems || [];

      cartItems.push(product);

      req.session.cartItems = cartItems;

      res.render("cart-page", {
        cart: { items: cartItems },
        Email:
          req.session && req.session.Email !== undefined
            ? req.session.Email
            : "",
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export { addcartdata };
