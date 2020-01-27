var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  const ubbleId = req.query.ubble_identification_id;
  console.log('User finished ubble identification: ', ubbleId);
  res.render("success", {
    title: "Your Website"
  });
});

module.exports = router;
