(function () {
    'use strict';

    angular
        .module('pcsManagement')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/register/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            })
            .state('companyList', {
                url: '/company',
                templateUrl: 'app/company/companyListView.html',
                controller: 'CompanyListCtrl',
                controllerAs: 'vm'
            })
            .state('companyEdit', {
                url: '/company/edit/:companyId',
                templateUrl: 'app/company/companyEditView.html',
                controller: 'CompanyEditCtrl as vm',
                resolve: {
                    companyResource: 'companyResource',

                    companies: function (companyResource, $stateParam) {
                        var companyId = $stateParam.comapnyId;
                        return companyResource.query({ companyId: companyId }).$promise;
                    }

                }
            })
            .state('exportFileList', {
                url: '/exportfile',
                templateUrl: 'app/exportfile/exportFileListView.html',
                controller: 'ExportFileListCtrl as vm',
                controllerAs: 'vm'
            })
            .state('exportFileEdit', {
                url: '/exportfile/edit/:exportFileId',
                templateUrl: 'app/exportfile/exportFileListView.html',
                controller: 'ExportFileEditCtrl as vm',
                resolve: {
                    exportFileResource: 'exportFileResource',

                    companies: function (exportFileResource, $stateParam) {
                        var exportFileId = $stateParam.exportFileId;
                        return exportFileResource.query({ exportFileId: exportFileId }).$promise;
                    }

                }
            });


        $urlRouterProvider.otherwise('/');
    }

})();
