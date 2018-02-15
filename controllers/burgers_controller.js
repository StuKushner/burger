var express = require("express");

var router = express.Router();

// Import the burger model to use
var burger = require("../models/burger.js");

// Create all of our routes and set up the appropriate logic
router.get("/", function(req, res){
	burger.selectAll(function(data){
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});

router.post("/", function(req, res){
	burger.insertOne([
		"burger_name", "devoured"
	], [
		req.body.burger_name, req.body.devoured
	], function(result) {
		res.redirect("/");
	});
});

router.put("/:id", function(req, res){
	var condition = "id = " + req.params.id;

	burger.updateOne({
		devoured: req.body.devoured
	}, condition, function(result) {
		res.redirect("/");
	});
});

// Export router for server.js to use
module.exports = router;