var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/genhash', function(req, res, next) {
    // Check if user 1 exists
    db.getQuery('SELECT id FROM user WHERE id = 1', null, function(err, results) {
        if (err) {
            res.status(500).send('Server Error');
            return;
        }
        
        if (results.length == 0) {
            db.getQuery('INSERT INTO user VALUES (1,"")', null, function(err, results) {
                if (err) {
                    res.status(500).send('Server Error');
                    return;
                }
            });
        }
        
    });
    
    // Save new hash
    bcrypt.genSalt(10, function(err, salt) {    
        bcrypt.hash('bacon', salt, function(err, hash){
                db.getQuery('UPDATE user SET h_password=? WHERE id=1', [hash], function(err, results) {
                if (err) { return res.status(500).send('Server Error'); }
                
                bcrypt.compare('bacon', hash, function(err, result){
                    console.log('Before setting the DB:' + hash);
                    res.send('Hash generated');
                });
            });
        });
    });
    
})

router.get('/login', function(req, res, next) {
    db.getQuery('SELECT id, h_password FROM user WHERE id=1', null, function(err, results) {
        if (err) { return res.status(500).send('Server Error'); }

        bcrypt.compare('bacon', results[0].h_password, function(err, result){
            if (err) { return res.status(500).send('Server Error'); }
            
            if (result) {
                res.send('Login successful');
            } else {
                res.send('Incorrect login');
            }
        });
    
       
    });
});

router.post('/login', function(req, res, next) {
    
});

module.exports = router;
