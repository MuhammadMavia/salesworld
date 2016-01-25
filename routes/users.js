var express = require('express');
var router = express.Router();
var schema = require("./schema");
var usersModel = schema.usersModel;

router.get('/', function (req, res) {
    usersModel.findOne({firebaseToken: req.query.firebaseToken}, function (err, success) {
        res.send(success || err);
    });
});

router.get('/users/:adminId', function (req, res) {
    usersModel.find({roll: 0, adminId: req.params.adminId}, function (err, success) {
        res.send(success || err);
    });
});


router.post('/update-profile', function (req, res) {
    usersModel.update({_id: req.body._id}, {$set: req.body}, function (err, success) {
        res.send(err || success);
    });
});
module.exports = router;
