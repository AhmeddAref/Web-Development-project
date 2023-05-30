import products from "../models/products.js";
import path from "path";
import { __dirname } from "../app.js";
import categories from "../models/categories.js";

//add product
const addproduct = (req, res) => {
  let imgFiles = [];
  let uploadPaths = [];

  console.log(req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  imgFiles.push(req.files.img1);
  imgFiles.push(req.files.img2);
  imgFiles.push(req.files.img3);
  imgFiles.push(req.files.img4);

  for (let i = 0; i < imgFiles.length; i++) {
    const imgFile = imgFiles[i];
    const uploadPath =
      __dirname +
      "/public/images/" +
      req.body.un +
      "_img" +
      (i + 1) +
      path.extname(imgFile.name);

    uploadPaths.push(uploadPath);

    imgFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      if (uploadPaths.length === imgFiles.length && i === imgFiles.length - 1) {
        const product = new products({
          name: req.body.name,
          description: req.body.description,
          color: req.body.color,
          category: req.body.category,
          shippingArea: req.body.shippingArea,
          oldPrice: req.body.oldprice,
          newPrice: req.body.newprice,
          image1: req.body.name + "_img1" + path.extname(imgFiles[0].name),
          image2: req.body.name + "_img2" + path.extname(imgFiles[1].name),
          image3: req.body.name + "_img3" + path.extname(imgFiles[2].name),
          image4: req.body.name + "_img4" + path.extname(imgFiles[3].name),
        });

        product
          .save()
          .then((result) => {
            res.redirect("/Admin-page");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Error saving product to database.");
          });
      }
    });
  }
};

//add category
const addcategory = (req, res) => {
  if (!req.body.name || !req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("Name and file are required.");
  }

  const imgFile = req.files.image;
  const uploadPath =
    __dirname + "/public/images/" + req.body.name + path.extname(imgFile.name);

  imgFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    const cat = new categories({
      name: req.body.name,
      image: req.body.name + path.extname(imgFile.name),
    });
    cat
      .save()
      .then((result) => {
        res.redirect("/Admin-page");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const getallproducts = (req, res) => {
  products
    .find()
    .then((result) => {
      res.render("allproducts", {
        products: result,
        Email:
          req.session && req.session.Email !== undefined
            ? req.session.Email
            : "",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { addproduct, addcategory, getallproducts };
