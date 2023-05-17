import express from "express";
import session from "express-session";

const app = express();

app.listen(9999);
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
const cat = [
  { name: "Beds & mattresses", imageUrl: "/images/beds-mattresses.jpg" },
  { name: "Furniture", imageUrl: "/images/furniture.jpg" },
  { name: "Decoration", imageUrl: "/images/decoration.jpg" },
  { name: "Kitchen & appliances", imageUrl: "/images/kitchen-appliances.jpg" },
  { name: "Bathroom products", imageUrl: "/images/bathroom-products.jpg" },
];
//-------------------------------------------//
const offers = [
  {
    name: "Product 1",
    image: "/images/chair2.jpg",
    description: "Product 1 Description",
    oldPrice: 99.99,
    newPrice: 79.99,
  },
  {
    name: "Product 2",
    image: "/images/chair2.jpg",
    description: "Product 2 Description",
    oldPrice: 149.99,
    newPrice: 119.99,
  },
  {
    name: "Product 3",
    image: "/images/chair2.jpg",
    description: "Product 3 Description",
    oldPrice: 199.99,
    newPrice: 120,
  },
  {
    name: "Product 4",
    image: "/images/chair2.jpg",
    description: "Product 4 Description",
    oldPrice: 79.99,
    newPrice: 59.99,
  },
];
//-------------------------------------------//
const slides = [
  {
    imageUrl: "/images/GM-BOXX-04-3-large (1).jpg",
    title: "Furniture",
    subtitle: "Create Your Home",
  },
  {
    imageUrl: "/images/61tV07vXkIL._SL1173_.jpg",
    title: "Furniture",
    subtitle: "Create Your Home",
  },
  {
    imageUrl: "/images/living-wall306.jpeg",
    title: "Furniture",
    subtitle: "Create Your Home",
  },
];
//-------------------------------------------//
const cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 15.0,
  total: 0,
};
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

const prod = {
  name: "Modern chair",
  rate: "4.2(21)",
  image1: "/images/chair1.jpg",
  image2: "/images/chair2.jpg",
  image3: "/images/chair3.jpg",
  image4: "/images/chair4.jpg",
  description:
    "If you like the stylish airy look, you have to try the deep generous seats. Create your own personal combination of SÖDERHAMN sofa, then sit down and relax – by yourself or together with the whole family.",
  color: "Black",
  Available: "in stock",
  Category: "Modern chair",
  Shipping_Area: "All over the world",
  Shipping_Fee: "Free",
  oldPrice: "$2570.00",
  newPrice: "$2490.00 (5%)",
};
//-----------------------------------//

const beds = [
  { id: "1", name: "MALM", price: "8,895", imageUrl: "/images/malm-bed-frame-high-black-brown__1101514_pe866693_s5.avif" },
  { id: "2", name: "SLATTUM", price: "8,995", imageUrl: "/images/slattum-upholstered-bed-frame-knisa-light-grey__1101373_pe866633_s5.avif" },
  { id: "3", name: "HAUGA", price: "11,995", imageUrl: "/images/hauga-upholstered-bed-frame-vissle-grey__1101343_pe866605_s5.avif" },
  { id: "4", name: "NEIDEN", price: "5,795", imageUrl: "/images/neiden-bed-frame-pine-luroey__1102024_pe866848_s5.avif" },
  { id: "5", name: "TYSSEDAL", price: "20,495", imageUrl: "/images/tyssedal-bed-frame-white-loenset__1102016_pe866840_s5.avif" }
];

app.get("/category.ejs", function (req, res) {
  res.render("category", {
    beds: beds,
    Email: req.session.Email === undefined ? "" : req.session.Email,
  });
});

//-----------------------------------//
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

app.get("/", (req, res) => {
  res.render("index", {
    cat: cat,
    offers: offers,
    slides: slides,
    Email: req.session.Email === undefined ? "" : req.session.Email,
  });
});

app.get("/form.ejs", function (req, res) {
  res.render("form", {
    Email: req.session.Email === undefined ? "" : req.session.Email,
  });
});

app.get("/category.ejs", function (req, res) {
  res.render("category", {
    Email: req.session.Email === undefined ? "" : req.session.Email,
  });
});
app.get("/Product-page.ejs", function (req, res) {
  res.render("Product-page", {
    prod: prod,
    Email: req.session.Email === undefined ? "" : req.session.Email,
  });
});
app.get("/cart-page.ejs", function (req, res) {
  res.render("cart-page", {
    cart: cart,
    Email: req.session.Email === undefined ? "" : req.session.Email,
  });
});

app.get("/checkout-page.ejs", function (req, res) {
  res.render("checkout-page", {
    cart: cart,
    Email: req.session.Email === undefined ? "" : req.session.Email,
  });
});
