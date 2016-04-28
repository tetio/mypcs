(function () {
    'use strict';

    angular
        .module('common.services')
        .factory('companyResource',
                ['$resource',
                 companyResource]);

    function companyResource($resource) {
        return $resource('http://localhost:3000/api/v1/company/:_id');
    }

}());
