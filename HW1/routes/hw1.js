var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({string: "Hey now"});
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  res.send({string: "Hey now"});
});

module.exports = router;
