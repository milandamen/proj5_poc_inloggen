var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/genhash', function(req, res, next) {
    res.send('Created hash');
})

router.get('/login', function(req, res, next) {
    
});

router.post('/login', function(req, res, next) {
    
});

module.exports = router;
