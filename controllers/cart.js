import products from "../models/products.js";

const addcartdata = (req, res, next) => {
  if (req.session && req.session.Email !== undefined) {
    // User is signed in, proceed with adding to cart
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
          Email: req.session.Email,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    // User is not signed in, handle the case appropriately
    const errorMessage = req.query.error || "";
    res.render("form", {
      err: "you must be logged in",
      errorMessage: errorMessage,
      errors: "",
      mode: "",
      Email:
        req.session && req.session.Email !== undefined ? req.session.Email : "",
      Type:
        req.session && req.session.Type !== undefined ? req.session.Type : "",
    });
  }
};

export { addcartdata };
