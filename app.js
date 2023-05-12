import express from "express";
const app = express();

app.listen(9999);
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});
