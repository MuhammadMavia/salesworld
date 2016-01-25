angular.module("salesman")
    .controller("Dashboard", function (usersService, $mdMedia, $mdDialog, $state, common, $scope, $http, $stateParams, $rootScope) {
        common.showLoading();
        //common.templateToast("templates/toast.html","updateUserProfile");
        // $scope.company = {};
        /* var uId = $stateParams.uId;
         console.log(uId);*/


        /* $scope.cropper = {};
         $scope.cropper.sourceImage = null;
         $scope.cropper.croppedImage = null;*/

        usersService.getAdmin().then(function (admin) {
            $scope.admin = admin;
            usersService.getCompany().then(function (company) {
                $scope.company = company;
                usersService.getUsers().then(function (users) {
                    $scope.users = users;
                });
            });
        });
        $scope.doLogOut = function () {
            common.doLogOut()
        };
        $scope.showUserFrom = usersService.showUserFrom;
        $scope.openLeftMenu = common.openLeftMenu;
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
            common.openLeftMenu();
            $state.go("dashboard.viewUserDetails");
        };
        $scope.viewAdminDetails = function () {
            $scope.user = $scope.admin;
            $state.go("dashboard.viewUserDetails");
        };
        $scope.viewCompanyDetails = function () {
            $state.go("dashboard.viewCompany");
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
        $scope.upLoadProfilePic = common.showDialog;
    });