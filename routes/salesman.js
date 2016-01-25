var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require("bcrypt-nodejs");
var router = express.Router();
var schema = require("./schema");

var Firebase = require("firebase");
var ref = new Firebase("https://salesworld.firebaseio.com/");

var usersModel = schema.usersModel;
var usersSchema = schema.usersSchema;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.post('/signup', function (req, res) {
    ref.createUser({
        email: req.body.userName,
        password: req.body.password
    }, function (error, userData) {
        if (error) {
            res.send(error);
        } else {
            req.body.firebaseToken = userData.uid;
            req.body.admin = true;
            var user = new usersModel(req.body);
            user.save(function (err, success) {
                res.send(err || success);
            });
        }
    });
});
router.post('/login', function (req, res) {
    usersModel.findOne({userName: req.body.userName}, function (err, success) {
        if (success) {
            bcrypt.compare(req.body.password, success.password, function (err, isMatch) {
                done(err, isMatch);
            });
            function done(err2, isMatch) {
                isMatch ? res.send(success) : res.send(err);
            }
        }
        else {
            res.send(success)
        }
    });
});
module.exports = router;
