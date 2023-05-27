import products from "../models/products.js";

const getproduct = (req, res) => {
  var query = { _id: req.params.id };
  products
    .findOne(query)
    .then((result) => {
      res.render("product-page", {
        prod: result,
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
// const getoffers = (req, res) => {
//   products
//     .find()
//     .then((result) => {
//       const offers = result;

//       res.get("/", function (req, res, next) {
//         res.render("index", {
//           offers: offers,

//           Email:
//             req.session && req.session.Email !== undefined
//               ? req.session.Email
//               : "",
//         });
//       });
//     })
//     .catch((error) => {
//       // Handle any errors that occur during the database query
//     });
// };

export { getproduct };
