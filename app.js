import express from "express";
const app = express();

app.listen(9999);
app.set("view engine", "ejs");
app.use(express.static("public"));
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
app.get("/cartpage.ejs", function (req, res) {
  res.render("cart-page");
});
app.get("/category.ejs", function (req, res) {
  res.render("category");
});
