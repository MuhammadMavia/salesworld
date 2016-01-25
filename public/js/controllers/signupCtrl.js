angular.module("salesman")
    .controller("SignUpCtrl", function (common, $scope, $http, $timeout, $location, $mdDialog) {
        $scope.addUser = function () {
            var user = common.matchPassword($scope.user);
            if (user) {
                common.showLoading();
                $http.post("/account/signup", user)
                    .then(
                        function (success) {
                            if (success.data.message) {
                                common.showMsg("This user name is not available!")
                            }
                            else {
                                localStorage.setItem("firebaseToken", success.data.firebaseToken);
                                $mdDialog.hide();
                                $location.path("/dashboard");
                                common.showMsg("Account Successfully created")
                            }
                        },
                        function (err) {
                            $mdDialog.hide();
                            common.showMsg("Account not created!");
                        });
            }
            else {
                $scope.user.password = "";
                $scope.user.ConfirmPassword = "";
                common.showMsg("These passwords don't match. Try again?");
            }
        };
    });