angular.module("salesman")
    .controller("updateUserProfile", function (common, $mdToast, $scope, usersService, $timeout, $location, $mdDialog) {
       /// $mdToast.hide();
        $scope.goToUpdateProfile = usersService.goToUpdateProfile;
    });