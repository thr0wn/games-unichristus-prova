var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: require('../utils/constants').INDEX_TITLE });
});

module.exports = router;