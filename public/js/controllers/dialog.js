angular.module("salesman")
    .controller("DialogCtrl", function (usersService, $mdMedia, $mdDialog, $state, common, $scope, $rootScope, $stateParams) {

        $scope.cropper = {
            sourceImage: null,
            croppedImage: null
        };
       // $rootScope.cropper = {};
        $scope.cropDone = function (done) {
            if (done) {
                common.croppedImage = $scope.cropper.croppedImage;
                $rootScope.croppedImage = common.croppedImage;
            }

            $mdDialog.hide()
        }
    });