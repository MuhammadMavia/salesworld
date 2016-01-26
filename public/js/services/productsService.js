angular.module("salesman")
    .service("productsService", function (common, $http, $mdDialog, $state, $q, $location) {
        this.getProducts = function (adminId) {
            var deferred = $q.defer();
            $http.get("/products/products/" + adminId).then(
                function (success) {
                    deferred.resolve(success.data);
                },
                function (error) {
                    deferred.resolve(error);
                }
            );
            return deferred.promise;
        };
        this.addProductFrom = function () {
            common.openLeftMenu('products');
            $state.go("dashboard.addProduct");
        };
        this.addProduct = function (product) {
            var deferred = $q.defer();
            $http.post("/products/add-product", product).then(
                function (success) {
                    deferred.resolve(success.data);
                },
                function (error) {
                    deferred.resolve(error);
                }
            );
            return deferred.promise;
        };
        this.editProduct = function (product) {
            common.showLoading();
            if (common.croppedImage) {
                product.img = common.croppedImage;
            }
            var deferred = $q.defer();
            $http.post("/products/edit-product", product).then(
                function (success) {
                    deferred.resolve(success.data);
                    common.showMsg("Product Successfully Update");
                },
                function (error) {
                    deferred.resolve(error);
                    common.showMsg("Product not Update!");
                }
            );
            return deferred.promise;
        };
    });