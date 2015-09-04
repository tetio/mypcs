(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("companyResource",
                ["$resource",
                 companyResource]);

    function companyResource($resource) {

        return $resource('http://localhost:6161/api/company/:companyId')
    }

}());