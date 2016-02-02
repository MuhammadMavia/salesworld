var express = require('express');
var Firebase = require('firebase');
var router = express.Router();
var schema = require("./schema");
var productsModel = schema.productsModel;
var usersModel = schema.usersModel;
var companiesModel = schema.companiesModel;
var notificationsModel = schema.notificationsModel;
var ref = new Firebase("https://salesworld.firebaseio.com/");


router.post("/push-notifications", function (req, res) {
    var notification = new notificationsModel(req.body);
    notification.save(function (success, error) {
        res.send(success);
    });
});


router.get("/get-notifications", function (req, res) {
    notificationsModel.find({adminFirebaseToken: req.query.firebaseToken}, function (success, error) {
        res.send(success || error);
    })
});


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

router.post("/read-Noti", function (req, res) {
    notificationsModel.update({_id: req.body._id}, {$set: req.body}, function (err, success) {
        res.send(err || success);
    });
});

router.post("/pushOrder", function (req, res) {
    delete req.body.salesman.profilePic;
    ref.child("notifications").child(req.body.salesman.adminId).child("notifications").push().set({
        position: req.body.coords,
        data: req.body.data,
        salesman: req.body.salesman.firstName + " " + req.body.salesman.lastName,
        read: false,
        time: Date.now()
    });
    res.end();
});

router.get("/products/:adminId", function (req, res) {
    productsModel.find({adminId: req.params.adminId}, function (err, data) {
        res.send(err || data);
    });
});
module.exports = router;