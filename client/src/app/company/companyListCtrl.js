(function () {
    "use strict";
    angular
        .module("pcsManagement")
        .controller("CompanyListCtrl",
                    ["companyResource",
                        CompanyListCtrl]);

    function CompanyListCtrl(companyResource) {
        var vm = this;

        companyResource.query(function(data) {
            vm.companies = data;
        });
    }
}());