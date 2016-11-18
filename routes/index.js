var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/student-list', function(req, res, next){
    res.render('student-list');
});
router.post('/uploadFile', function(req, res, next){
    res.redirect('/student-list');
})

module.exports = router;
