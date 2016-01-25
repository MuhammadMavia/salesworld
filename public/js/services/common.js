angular.module("salesman")
    .factory("common", function ($mdToast, $mdDialog, $timeout, $state, $mdSidenav, $mdMedia) {
        function showMsg(msg) {
            $mdToast.show(
                $mdToast
                    .simple()
                    .textContent(msg)
                    .position("bottom right")
                    .hideDelay(2000)
            )

        }

        function showLoading() {
            $mdDialog.show({
                template: '' +
                '<md-dialog class="loading">' +
                '<md-progress-circular md-diameter="100"></md-progress-circular>' +
                '</md-dialog>',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            });
        }

        function templateToast(temp, ctrl) {
            $mdToast.show({
                controller: ctrl,
                templateUrl: temp,
                // parent: $document[0].querySelector('#toastBounds'),
                hideDelay: 10000,
                position: "bottom left"
            });
        }

        function updateProfilePic() {
            return this.croppedImage
        }

        function doLogOut() {
            localStorage.removeItem("firebaseToken");
            this.showLoading();
            $timeout(function () {
                $mdDialog.hide();
                $state.go("login")
            }, 1000)
        }

        function openLeftMenu() {
            $mdSidenav('left').toggle();
        }

        function showDialog(ev, temp, ctrl) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                controller: ctrl,
                templateUrl: temp,
                ///parent: angular.element(document.body),
                //targetEvent: ev,
                //clickOutsideToClose: true,
                //fullscreen: useFullScreen
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function matchPassword(user) {
            if (user.password == user.ConfirmPassword) {
                return {
                    firstName: user.firstName.toLowerCase(),
                    lastName: user.lastName.toLowerCase(),
                    userName: user.userName.toLowerCase(),
                    password: user.password.toLowerCase()
                };
            }
            return false;
        }

        return {
            showMsg: showMsg,
            croppedImage: null,
            showLoading: showLoading,
            updateProfilePic: updateProfilePic,
            doLogOut: doLogOut,
            openLeftMenu: openLeftMenu,
            showDialog: showDialog,
            matchPassword: matchPassword,
            templateToast: templateToast,
            cancel: cancel
        }
    });