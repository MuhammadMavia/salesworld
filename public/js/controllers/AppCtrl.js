angular.module("salesman")
    .controller("AppCtrl", function ($rootScope,common,$mdDialog,$state,$timeout) {
        /*$rootScope.showMsg = function showMsg(msg) {
            $mdToast.show(
                $mdToast
                    .simple()
                    .textContent(msg)
                    .position("bottom right")
                    .hideDelay(2000)
            )

        };*/
        /*$rootScope.showLoading = function () {
            $mdDialog.show({
                template: '' +
                '<md-dialog class="loading">' +
                '<md-progress-circular md-diameter="100"></md-progress-circular>' +
                '</md-dialog>',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            });
        };*/
        /*$rootScope.doLogOut = function () {
            localStorage.removeItem("firebaseToken");
            common.showLoading();
            $timeout(function () {
                $mdDialog.hide();
                $state.go("login")
            }, 1000)
        };*/
        /*$scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };*/
        /*$scope.showDialog = function(ev,temp) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                    templateUrl: temp,
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };*/
        /*$rootScope.cancel = function () {
            $mdDialog.cancel();
        };*/
    });