(function () {
    'use strict';

    angular
        .module('common.services')
        .factory('exportFileResource',
                ['$resource',
                 exportFileResource]);

    function exportFileResource($resource) {
        return $resource('http://localhost:6161/api/exportfile/:exportFileId');
    }

}());
