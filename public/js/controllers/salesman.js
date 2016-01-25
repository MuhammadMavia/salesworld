angular.module("salesman")
    .controller("SalesmanCtrl", function (common,$http, $scope, $mdToast, $mdDialog, $timeout, $state, $mdSidenav, $mdMedia) {
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    });
