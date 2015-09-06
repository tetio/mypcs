(function () {
    'use strict';
    angular
        .module('pcsManagement')
        .controller('CompanyListCtrl',
            ['companyResource',
                CompanyListCtrl]);

    function CompanyListCtrl(companyResource) {
        var vm = this;

        vm.companies = [];

        vm.findCompanies = function () {
            vm.companies.splice(0, vm.companies.length);
            companyResource.query(function (data) {
                angular.forEach(data, function (company) {
                    vm.companies.push(company);
                });
            });
        }

        vm.gridOptions = {
            columnDefs: [{ field: '_id', title: 'id' }, { field: 'name' }, { field: 'code' }, { field: 'situation' }, { field: 'last_modification' }],
            data: vm.companies
        };
    }
} ());