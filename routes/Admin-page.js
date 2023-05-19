import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Admin-page", {
    Email: req.session && req.session.Email !== undefined ? req.session.Email : "",
  });
});

export default router;