import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("form", {
    // Email: req.session.Email === undefined ? "" : req.session.Email,
  });
});

export default router;
