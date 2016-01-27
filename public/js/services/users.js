angular.module("salesman")
    .service("usersService", function (common, $http, $mdDialog, $state, $q, $location) {
        var admin, users, company = {};

        this.getAdmin = function () {
            var deferred = $q.defer();
            $http.get("/users").then(
                function (success) {
                    admin = success.data;
                    deferred.resolve(admin);
                },
                function (err) {
                    deferred.resolve(err);
                });
            return deferred.promise;
        };
        this.getCompany = function () {
            var deferred = $q.defer();
            $http.get("/company/" + admin._id).then(
                function (success) {
                    $mdDialog.hide();
                    if (!success.data) {
                        $state.go("dashboard.createCompany")
                    } else {
                        company = success.data;
                        deferred.resolve(company);
                        $state.go("dashboard.dashboard-home");
                    }
                },
                function (err) {
                    company = err;
                    $mdDialog.hide();
                });
            return deferred.promise;
        };
        this.getUsers = function () {
            var deferred = $q.defer();
            $http.get("/users/users/" + admin._id).then(
                function (success) {
                    users = success.data;
                    deferred.resolve(users);
                },
                function (err) {
                    deferred.resolve(err);
                });
            return deferred.promise;
        };
        this.showUserFrom = function () {
            common.openLeftMenu('salesman' || 'products');
            $state.go("dashboard.addSalesman");
        };
        this.addUser = function (u) {
            var deferred = $q.defer();
            var user = common.matchPassword(u);
            if (user) {
                common.showLoading();
                user.adminId = admin._id;
                user.companyId = company._id;
                user.roll = 0;
                $http.post("/account/signup", user).then(
                    function (success) {
                        $mdDialog.cancel();
                        if (success.data.code) {
                            common.showMsg("User name not is available!");
                        }
                        else {
                            $http.post("/company/add-salesman-id", {
                                    adminId: success.data.adminId,
                                    userId: success.data._id
                                })
                                .then(function (data) {
                                    console.log(data)
                                }, function (err) {
                                    console.log(err)
                                });

                            deferred.resolve(true);
                            $state.go("dashboard.dashboard-home");
                            //getUsers();
                            common.showMsg("Successfully created account");
                        }

                    },
                    function (err) {
                        $mdDialog.cancel();
                    }
                );
            }
            else {
                common.showMsg("These passwords don't match. Try again?");
            }
            return deferred.promise;
        };
        this.createCompany = function (company) {
            var deferred = $q.defer();
            common.showLoading();
            company.adminId = admin._id;
            $http.post("/company/create-company", company).then(
                function (success) {
                    console.log(success.data);
                    $mdDialog.hide();
                    common.showMsg("Company created successfully!");
                    $state.go("dashboard.dashboard-home");
                    deferred.resolve(success.data);
                },
                function (err) {
                    $mdDialog.hide();
                    common.showMsg("Company not created!");
                    deferred.resolve(err);
                });
            return deferred.promise;
        };
        this.goToUpdateProfile = function () {
            $location.path("/dashboard/updateUserProfile")
        };
        this.updatedUserSave = function (done, userUpdates) {
            if (done) {
                var user = null;
                    user = common.matchPassword(userUpdates);
                if (!user) {
                    common.showMsg("Password not matched!");
                }
                if (user) {
                    common.showLoading();
                    if (common.croppedImage) {
                        user.profilePic = common.croppedImage;
                    }
                    user._id = userUpdates._id;
                    $http.post("/users/update-profile", user)
                        .success(function (success) {
                            $mdDialog.hide();
                            common.showMsg("Profile successfully updated!");
                            $state.go("dashboard.viewUserDetails");
                        })
                        .error(function (error) {
                            $mdDialog.hide();
                            common.showMsg("Profile not updated! Try again");
                        })
                }
            }
            else {
                $state.go("dashboard.viewUserDetails");
            }

        };
        this.updatedCompanySave = function (company) {
            common.showLoading();
            if (common.croppedImage) {
                company.logo = common.croppedImage;
            }
            $http.post("/company/update-company", company).then(
                function (success) {
                    $mdDialog.hide();
                    common.showMsg("Successfully Update Company");
                    $state.go("dashboard.viewCompany")
                },
                function (err) {
                    $mdDialog.hide();
                    common.showMsg("Failed to Update!");
                }
            )
        };
    });