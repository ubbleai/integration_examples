import { generateUbbleIdentification } from "../services/ubble";

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function(req, res, next) {
  try {
    const { identificationUrl } = await generateUbbleIdentification();
    console.log(identificationUrl);
    res.render("index", {
      title: "Ubble",
      ubbleLink: identificationUrl
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
