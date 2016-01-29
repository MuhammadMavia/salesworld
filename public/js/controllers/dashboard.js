angular.module("salesman")
    .controller("Dashboard", function (firebaseRef, $firebaseArray, usersService, productsService, $mdMedia, $mdDialog, $state, common, $scope, $http, $stateParams, $rootScope) {
        common.showLoading();

        //common.templateToast("templates/toast.html","updateUserProfile");
        // $scope.company = {};
        /* var uId = $stateParams.uId;
         console.log(uId);*/
        var ref = new Firebase(firebaseRef);

        $scope.oldNotifications = 0;

        $scope.checkNotifications = function () {
            $scope.oldNotifications = $scope.notifications.length;
            $scope.notifications.forEach(function (val) {
                $http.post("/products/push-notifications", {firebaseToken: $scope.admin.firebaseToken, data: val});
            });
            $http.get("/products/get-notifications").then(
                function (success) {
                    console.log(success);
                },
                function (err) {
                    console.log(err);
                }
            );

        };
        $scope.readNotification = function (noti, index) {
            noti.read = true;
            $scope.notifications.$save(noti);
        };


        //$scope.online = $firebaseArray(ref.child("presence").child("56a9e1c9bd88b2b80cef51a9"));

        usersService.getAdmin().then(function (admin) {
            $scope.admin = admin;
            $scope.notifications = $firebaseArray(ref.child("notifications").child(admin._id).child("notifications"));
            usersService.getCompany().then(function (company) {
                $scope.company = company;
                usersService.getUsers().then(function (users) {
                    $scope.users = users;
                });
                productsService.getProducts(admin._id).then(function (products) {
                    $scope.products = products;
                });
            });
        });
        $scope.doLogOut = function () {
            common.doLogOut()
        };
        $scope.showUserFrom = usersService.showUserFrom;
        $scope.openLeftMenu = common.openLeftMenu;
        $scope.createCompanyForm = function () {
            $state.go("dashboard.createCompany")
        };
        $scope.createCompany = function (company) {
            usersService.createCompany(company).then(function (data) {
                $scope.company = data;
            })
        };
        $scope.addUser = function (u) {
            usersService.addUser(u).then(function () {
                usersService.getUsers().then(function (users) {
                    $scope.users = users;
                });
            })
        };
        $scope.viewUserDetails = function (user) {
            $scope.user = user;
            common.openLeftMenu('salesman');
            $state.go("dashboard.viewUserDetails");
        };
        $scope.viewAdminDetails = function () {
            $scope.user = $scope.admin;
            $state.go("dashboard.viewUserDetails");
        };
        $scope.viewCompanyDetails = function () {
            $state.go("dashboard.viewCompany");
        };
        $scope.addProduct = function (product) {
            product.adminId = $scope.admin._id;
            product.companyId = $scope.company._id;
            productsService.addProduct(product).then(
                function () {
                    console.log("OOO");
                    productsService.getProducts($scope.admin._id).then(function (products) {
                        $scope.products = products;
                    });
                }
            );
        };
        $scope.addProductFrom = productsService.addProductFrom;
        $scope.editProduct = function (product) {
            productsService.editProduct(product).then(function (data) {
                $mdDialog.hide();
                $state.go("dashboard.dashboard-home");
            })
        };
        $scope.updateProduct = function () {
            $state.go("dashboard");
        };
        $scope.viewProductDetails = function (product) {
            $scope.product = product;
            common.openLeftMenu('products');
            $state.go("dashboard.viewProductDetails");
        };
        $scope.updateCompany = function () {
            $state.go("dashboard.updateCompany");
        };
        $scope.updateUserProfile = function () {
            $scope.user.password = null;
            $scope.userUpdates = JSON.parse(JSON.stringify($scope.user));
            $state.go("dashboard.updateUserProfile");
        };
        $scope.updateAdminProfile = function () {
            $scope.admin.password = null;
            $scope.userUpdates = JSON.parse(JSON.stringify($scope.admin));
            $state.go("dashboard.updateUserProfile");
        };
        $scope.updatedUserSave = usersService.updatedUserSave;
        $scope.updatedCompanySave = usersService.updatedCompanySave;
        $scope.upLoadProfilePic = common.showDialog;
    });