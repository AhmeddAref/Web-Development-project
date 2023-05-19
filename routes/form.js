import { Router } from "express";
var router = Router();


/* GET home page. */
router.get("/", function (req, res, next) {
  const errorMessage = req.query.error || ""; 
  res.render("form", {
    errorMessage: errorMessage, 
    Email: req.session && req.session.Email !== undefined ? req.session.Email : "",
  });
});

export default router;
