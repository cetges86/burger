var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.get("/api/burgers", function(req,res){
  burger.selectAll(function(data){
    res.json(data);
  })
})

router.get("/app/public/assets/css/burger_style.css", function (req, res) {
  res.sendFile(process.cwd() + "/app/public/assets/css/" + "burger_style.css");
});

router.get("/app/public/assets/js/cheeseburger.js", function (req, res) {
  res.sendFile(process.cwd() + "/app/public/assets/js/" + "cheeseburger.js");
});


router.post("/api/burgers", function (req, res) {
  burger.insertOne([
    "burger_name", "devoured"
  ], [
      req.body.name, false
    ], function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log(req.body)

  burger.updateOne({
    devoured: true
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
// Export routes for server.js to use.
module.exports = router;
