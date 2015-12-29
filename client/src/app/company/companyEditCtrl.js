(function () {
    'use strict';
    angular
        .module('pcsManagement')
        .controller('CompanyEditCtrl',
            ['company',
                CompanyEditCtrl]);

    function CompanyEditCtrl(company) {
        var vm = this;
        vm.company = company;

    }
} ());
