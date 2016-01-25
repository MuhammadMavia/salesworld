angular.module("salesman")
    .controller("CreateCompany", function ($http, $scope, $mdToast, $mdDialog, $timeout, $state, $mdSidenav, $mdMedia) {
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.createCompany = function () {
            $http.post("/company/create-company",$scope.company).then(
                function (data) {
                    console.log(data);
                },
                function (err) {
                    console.log(err);
                }
            )
        }
    });
