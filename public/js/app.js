angular.module("salesman", ["ngMaterial", "ui.router", "ngMdIcons", "angular-img-cropper", "md.data.table"])
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                var firebaseToken = localStorage.getItem("firebaseToken");
                if (toState.name.slice(0, toState.name.indexOf(".")) === "dashboard" && !firebaseToken) {
                    event.preventDefault();
                    $state.go("login")
                }
                else if ((toState.name == "login" || toState.name == "signup") && firebaseToken) {
                    event.preventDefault();
                    $state.go("dashboard.dashboard-home")
                }
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider) {
        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: "LoginCtrl"
            })
            .state("table", {
                url: "/table",
                templateUrl: "templates/table.html",
                controller: "TableCtrl"
            })
            .state("signup", {
                url: "/signup",
                templateUrl: "templates/signup.html",
                controller: "SignUpCtrl"
            })
            .state("dashboard", {
                url: "/dashboard",
                templateUrl: "templates/dashboard.html",
                controller: "Dashboard"
            })
            .state('dashboard.createCompany', {
                url: '/createCompany',
                views: {
                    'dashboardContent': {
                        templateUrl: 'templates/createCompany.html'
                    }
                }
            })
            .state('dashboard.viewCompany', {
                url: '/viewCompany',
                views: {
                    'dashboardContent': {
                        templateUrl: 'templates/viewCompany.html'
                    }
                }
            })
            .state('dashboard.updateCompany', {
                url: '/updateCompany',
                views: {
                    'dashboardContent': {
                        templateUrl: 'templates/updateCompany.html'
                    }
                }
            })
            .state('dashboard.addSalesman', {
                url: '/addSalesman',
                views: {
                    'dashboardContent': {
                        templateUrl: 'templates/addSalesman.html'
                    }
                }
            })
            .state('dashboard.updateUserProfile', {
                url: '/updateUserProfile/:uId',
                views: {
                    'dashboardContent': {
                        templateUrl: 'templates/updateUserProfile.html',
                        //controller: 'updateUserProfile'
                    }
                }
            })
            .state('dashboard.viewUserDetails', {
                url: '/viewUserDetails/:user',
                views: {
                    'dashboardContent': {
                        templateUrl: 'templates/viewUserDetails.html',
                        //controller: 'updateUserProfile'
                    }
                }
            })
            .state('dashboard.dashboard-home', {
                url: '/home',
                views: {
                    'dashboardContent': {
                        templateUrl: 'templates/dashboard-home.html'
                    }
                }
            });
        $urlRouterProvider.otherwise("login");

        $httpProvider.interceptors.push('httpInterceptor');

        $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple').dark();
    })
    .filter('capitalize', function () {
        return function (input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    })
    .factory("httpInterceptor", function () {
        return {
            request: function (config) {
                var firebaseToken = localStorage.getItem("firebaseToken");
                if (firebaseToken) {
                    config.url = config.url + "?firebaseToken=" + firebaseToken;
                }
                return config;
            }
        }
    });
