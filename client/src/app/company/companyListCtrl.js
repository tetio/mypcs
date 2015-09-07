(function () {
    'use strict';
    angular
        .module('pcsManagement')
        .controller('CompanyListCtrl',
            ['companyResource', '$scope',
                CompanyListCtrl]);

    function CompanyListCtrl(companyResource, $scope) {
        var vm = this;


        vm.findCompanies = function () {
            console.log('findCompanies');
            companyResource.query(function (data) {
                vm.gridOptions.data = data;
            });
        }


        vm.showSelected = function () {
            console.log('getCurrentSelection code: '+vm.selectedCompany.code);
        }


        vm.gridOptions = {
            enableSorting: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            modifierKeysToMultiSelect: false,
            noUnselect: true
        };
        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var msg = 'row selected ' + row.isSelected;
                console.log(msg);
                vm.selectedCompany = row.entity;
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                var msg = 'rows changed ' + rows.length;
                console.log(msg);
 
            });
        };        
        //vm.gridOptions.data = 'vm.companies';
        vm.gridOptions.columnDefs = [
            { field: '_id', displayName: 'id' },
            { field: 'name' },
            { field: 'code' },
            { field: 'situation' },
            { field: 'last_modification', cellFilter: 'date:"dd/MM/yyyy HH:mm"', type: 'date' }
        ];

    }
} ());