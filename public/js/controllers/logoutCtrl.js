angular.module("salesman")
    .controller("loguut", function ($scope, $http, $stateParams) {

        var uId = $stateParams.uId;
        $http.get("/users/" + uId).then(
            function (data) {
                $scope.user = data.data;
            },
            function (err) {
                //console.log(data)
            })
    })
    .filter('capitalize', function () {
        return function (input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    });