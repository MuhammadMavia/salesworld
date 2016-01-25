angular.module("salesman")
    .controller("LoginCtrl", function (common,$http, $scope, $timeout, $mdDialog, $location) {
        $scope.loginNow = function () {
            common.showLoading();
            var user = {
                userName: $scope.user.userName.toLowerCase(),
                password: $scope.user.password.toLowerCase()
            };
            $http.post("/account/login", user)
                .then(
                    function (data) {
                        $mdDialog.hide();
                        var user = data.data;
                        console.log(user);
                        if (!user) {
                            common.showMsg("Invalid user name or password!");
                        }
                        else {
                            localStorage.setItem("firebaseToken",user.firebaseToken);
                            common.showMsg("Welcome " +
                                user.firstName.charAt(0).toUpperCase() +
                                user.firstName.slice(1) + " " +
                                user.lastName.charAt(0).toUpperCase() +
                                user.lastName.slice(1));
                            $location.path("/dashboard");
                        }
                    },
                    function (err) {
                        $mdDialog.hide();
                        common.showMsg("Logging Failed please Try again!")
                    });
        }
    });