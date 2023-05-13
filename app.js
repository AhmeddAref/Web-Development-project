import express from "express";
import session from "express-session";
const app = express();

app.listen(9999);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

const cat = [
  { name: "Beds & mattresses", imageUrl: "/images/beds-mattresses.jpg" },
  { name: "Furniture", imageUrl: "/images/furniture.jpg" },
  { name: "Decoration", imageUrl: "/images/decoration.jpg" },
  { name: "Kitchen & appliances", imageUrl: "/images/kitchen-appliances.jpg" },
  { name: "Bathroom products", imageUrl: "/images/bathroom-products.jpg" },
];
const offers = [
  {
    name: "Product 1",
    image: "/images/chair2.jpg",
    description: "Product 1 Description",
    oldPrice: "$99.99",
    newPrice: "$79.99",
  },
  {
    name: "Product 2",
    image: "/images/chair2.jpg",
    description: "Product 2 Description",
    oldPrice: "$149.99",
    newPrice: "$119.99",
  },
  {
    name: "Product 3",
    image: "/images/chair2.jpg",
    description: "Product 3 Description",
    oldPrice: "$199.99",
    newPrice: "$120",
  },
  {
    name: "Product 4",
    image: "/images/chair2.jpg",
    description: "Product 4 Description",
    oldPrice: "$79.99",
    newPrice: "$59.99",
  },
];

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

const cart = {
  items: [
    {
      image: "../images/chair2.jpg",
      title: "Modern Chair",
      description:
        "If you like the stylish airy look, you have to try the deep generous seats. Create your own personal combination of SÖDERHAMN sofa, then sit down and relax – by yourself or together with the whole family.",
      price: 120.99,
      quantity: 2,
    },
    {
      image:
        "../images/hauga-upholstered-bed-frame-vissle-grey__1101343_pe866605_s5.avif",
      title: "MALM Bed",
      description:
        "A clean design with solid wood veneer. Place the bed freestanding or with the headboard against a wall. If you need space for extra bedding, add MALM bed storage boxes on castors.",
      price: 450.99,
      quantity: 1,
    },
  ],
  subtotal: 0,
  tax: 0,
  shipping: 15.0,
  total: 0,
};

// Calculate subtotal, tax, and total based on the items in the cart
cart.subtotal = cart.items.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);
cart.tax = cart.subtotal * 0.05;
cart.total = cart.subtotal + cart.tax + cart.shipping;

app.get("/", function (req, res) {
  res.render("index", { cat: cat, offers: offers, slides: slides });
});
app.get("/form.ejs", function (req, res) {
  res.render("form");
});

app.get("/category.ejs", function (req, res) {
  res.render("category");
});
app.get("/Product-page.ejs", function (req, res) {
  res.render("Product-page");
});
app.get("/cart-page.ejs", function (req, res) {
  res.render("cart-page", { cart: cart });
});
app.get("/category.ejs", function (req, res) {
  res.render("category");
});
