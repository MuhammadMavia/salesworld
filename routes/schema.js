var mongoose = require("mongoose");
var connection = mongoose.connect("mongodb://mavia:mavia@ds037205.mongolab.com:37205/salesman");
//var connection = mongoose.connect("mongodb://localhost/salesman");
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require("bcrypt-nodejs");

/* Company Schema */

var companiesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    usersIds: {type: Array},
    productsIds: {type: Array},
    adminId: String,
    logo: String,
    createdOn: {type: Date, default: Date.now()}
});
exports.companiesModel = mongoose.model("companies", companiesSchema);
exports.companiesSchema = companiesSchema;

/* Products Schema */

var productsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    adminId: {type: String, required: true},
    companyId: {type: String, required: true},
    price: {type: Number, required: true},
    img: String,
    size: String,
    createdOn: {type: Date, default: Date.now()}
});

exports.productsModel = mongoose.model("products", productsSchema);

/* User Schema */

var usersSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roll: {type: Number, default: 1},
    adminId: String,
    profilePic: String,
    companyId: String,
    usersIds: [],
    productsIds: {type: Array},
    firebaseToken: {type: String, required: true},
    createdOn: {type: Date, default: Date.now()}
});

function n() {
}
usersSchema.pre("save", function (done) {
    var user = this;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, n, function (err, hashed) {
            user.password = hashed;
            done();
        });
    });
});
usersSchema.plugin(uniqueValidator);
exports.usersModel = mongoose.model("users", usersSchema);
exports.usersSchema = usersSchema;
