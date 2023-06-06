import { Router } from "express";
import users from "../models/users.js";

const getUser = (req, res) => {
    users.findOne(req.body.email)
    .then((result) => {
          res.render("User-dashboard", {
            user: result,
            Email:
              req.session && req.session.Email !== undefined
                ? req.session.Email
                : "",
            Type:
              req.session && req.session.Type !== undefined
                ? req.session.Type
                : "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    export { getUser };
