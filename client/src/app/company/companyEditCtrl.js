(function() {
    'use strict';
    angular
        .module('pcsManagement')
        .controller('CompanyEditCtrl',
        ['company',
            "$state",
            CompanyEditCtrl]);

    function CompanyEditCtrl(company, $state) {
        var vm = this;
        vm.company = company;

        vm.confirm = function() {
            // companyResource.update({ _id: vm.company._id }, vm.company);
            vm.company.$save(function(data) {
                toastr.success("Save Successful");
//                console.log("Save Successful");
                $state.go('companyList');
            })
        }
    }
} ());
