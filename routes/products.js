var express = require('express');
var Firebase = require('firebase');
var router = express.Router();
var schema = require("./schema");
var productsModel = schema.productsModel;
var usersModel = schema.usersModel;
var companiesModel = schema.companiesModel;
var ref = new Firebase("https://salesworld.firebaseio.com/");


router.post("/add-product", function (req, res) {
    var product = new productsModel(req.body);
    product.save(function (err, data) {
        companiesModel.update({_id: req.body.companyId}, {$push: {productsIds: data._id}}, function (e, d) {
            usersModel.update({_id: req.body.adminId}, {$push: {productsIds: data._id}}, function (e, d) {
                res.send(err || data);
            });
        });
    });
});

router.post("/edit-product", function (req, res) {
    productsModel.update({_id: req.body._id}, {$set: req.body}, function (err, success) {
        res.send(err || success);
    });
});

router.post("/pushOrder", function (req, res) {
    delete req.body.salesman.profilePic;
    req.body.data.forEach(function(val){
        ref.child(req.body.salesman.adminId).push().set(val);
    });
    res.end();
});

router.get("/products/:adminId", function (req, res) {
    productsModel.find({adminId: req.params.adminId}, function (err, data) {
        res.send(err || data);
    });
});
module.exports = router;