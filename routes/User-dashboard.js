import { Router } from "express";

var router = Router();

router.get("/", (req, res, next) => {
  res.render("User-dashboard", {
    Email:
      req.session && req.session.Email !== undefined ? req.session.Email : "",
    Type: req.session && req.session.Type !== undefined ? req.session.Type : "",
  });
});

export default router;
