import products from "../models/products.js";
import path from "path";
import { __dirname } from "../app.js";
import categories from "../models/categories.js";
import offers from "../Data/offers.js";
import users from "../models/users.js";
import fs from "fs";

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

////////////////////////////////////////////////////////

//add product form validation

// app.post('/addproduct', (req, res) => {
//   const { name, price } = req.body;

//   const namePattern = /^[a-zA-Z\s]+$/;
//   const pricePattern = /^\d+(\.\d{1,2})?$/;

//   if (!name || !price) {
//     return res.status(400).json({ error: 'Name and price are required fields.' });
//   }

//   if (!namePattern.test(name)) {
//     return res.status(400).json({ error: 'Invalid product name. Only letters and spaces are allowed.' });
//   }

//   if (!pricePattern.test(price)) {
//     return res.status(400).json({ error: 'Invalid product price. Please provide a numeric value.' });
//   }

//   res.status(200).json({ message: 'Product added successfully.' });
// });

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

const editproduct = (req, res) => {
  products.findOne({ _id: req.params.id }).then((product) => {
    users
      .find()
      .then((result) => {
        res.render("Admin-page", {
          users: result,
          product: product,
          Email:
            req.session && req.session.Email !== undefined
              ? req.session.Email
              : "",
        });
      })

      .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving product");
      });
  });
};
const updateProduct = (req, res) => {
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
        products
          .findById(req.params.id)
          .then((product) => {
            if (!product) {
              return res.status(404).send("Product not found");
            }

            product.name = req.body.name;
            product.description = req.body.description;
            product.color = req.body.color;
            product.category = req.body.category;
            product.shippingArea = req.body.shippingArea;
            product.oldPrice = req.body.oldprice;
            product.newPrice = req.body.newprice;
            product.image1 =
              req.body.name + "_img1" + path.extname(imgFiles[0].name);
            product.image2 =
              req.body.name + "_img2" + path.extname(imgFiles[1].name);
            product.image3 =
              req.body.name + "_img3" + path.extname(imgFiles[2].name);
            product.image4 =
              req.body.name + "_img4" + path.extname(imgFiles[3].name);

            product
              .save()
              .then((updatedProduct) => {
                res.redirect("/Admin-page/allproducts");
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send("Error updating product");
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Error retrieving product");
          });
      }
    });
  }
};
const addoffers = (req, res) => {
  products.findOne({ _id: req.params.id }).then((product) => {
    categories
      .find()
      .then((result) => {
        offers.push(product);

        res.render("index", {
          cat: result,
          offers: offers,

          Email:
            req.session && req.session.Email !== undefined
              ? req.session.Email
              : "",
          err: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const deleteproduct = (req, res) => {
  products
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      const image1Path = path.join(
        __dirname,
        "/public/images/" + req.params.image1
      );
      const image2Path = path.join(
        __dirname,
        "/public/images/" + req.params.image2
      );
      const image3Path = path.join(
        __dirname,
        "/public/images/" + req.params.image3
      );
      const image4Path = path.join(
        __dirname,
        "/public/images/" + req.params.image4
      );

      fs.unlink(image1Path, (err) => {
        if (err) {
          throw err;
        }
        fs.unlink(image2Path, (err) => {
          if (err) {
            throw err;
          }
          fs.unlink(image3Path, (err) => {
            if (err) {
              throw err;
            }
            fs.unlink(image4Path, (err) => {
              if (err) {
                throw err;
              }
              res.redirect("/Admin-page/allproducts");
            });
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//----------------Users-----------------//

const DeleteUser = (req, res) => {
  users
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.redirect("/admin-page");
    })
    .catch((err) => {
      console.log(err);
    });
};

const toAdmin = (req, res) => {
  users
    .findByIdAndUpdate(req.params.id, { Type: "admin" })
    .then((result) => {
      res.redirect("/admin-page");
    })
    .catch((err) => {
      console.log(err);
    });
};

const toClient = (req, res) => {
  users
    .findByIdAndUpdate(req.params.id, { Type: "client" })
    .then((result) => {
      res.redirect("/admin-page");
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  addproduct,
  addcategory,
  getallproducts,
  editproduct,
  updateProduct,
  addoffers,
  deleteproduct,
  DeleteUser,
  toAdmin,
  toClient,
};
