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

app.get("/", function (req, res) {
  res.render("index", { cat });
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

const employees = [
  { id: "1", name: "Essam Eliwa", position: "Doctor" },
  { id: "2", name: "Nada Ayman", position: "Assistant" },
  { id: "3", name: "XYZ", position: "ABC" },
];
