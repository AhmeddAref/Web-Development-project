import express from "express";
const app = express();

app.listen(9999);
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
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
