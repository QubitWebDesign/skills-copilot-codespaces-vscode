// Create web server
var express = require("express");
var router = express.Router();
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// GET route for getting all of the comments
router.get("/api/comments", function(req, res) {
  var query = {};
  if (req.query.user_id) {
    query.UserId = req.query.user_id;
  }

  db.Comment.findAll({
    where: query,
    include: [db.User]
  }).then(function(dbComment) {
    res.json(dbComment);
  });
});

// Get route for retrieving a single comment
router.get("/api/comments/:id", function(req, res) {
  db.Comment.findOne({
    where: {
      id: req.params.id
    },
    include: [db.User]
  }).then(function(dbComment) {
    res.json(dbComment);
  });
});

// POST route for saving a new comment
router.post("/api/comments", function(req, res) {
  db.Comment.create(req.body).then(function(dbComment) {
    res.json(dbComment);
  });
});

// DELETE route for deleting comments
router.delete("/api/comments/:id", function(req, res) {
  db.Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbComment) {
    res.json(dbComment);
  });
});

// PUT route for updating comments
router.put("/api/comments", function(req, res) {
  db.Comment.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(function(dbComment) {
    res.json(dbComment);
  });
});

module.exports = router;